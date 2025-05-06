// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;


//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Get the user from the decoded token ID
//     req.user = await User.findById(decoded.id).select('-password');
    
//     if (!req.user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     next();
//   } catch (err) {
//     // Handle any errors such as expired token or invalid token
//     console.error('JWT error: ', err);
//     return res.status(401).json({ message: 'Token failed' });
//   }
// };

// module.exports = { protect };



// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Protect middleware to verify access token
// const protect = async (req, res, next) => {
//   let token = req.headers.authorization;

//   // If no token in Authorization header, check cookies for refresh token
//   if (!token && req.cookies.refreshToken) {
//     // If no Authorization header but a refresh token cookie exists, try to refresh the token
//     try {
//       const refreshToken = req.cookies.refreshToken;
//       jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
//         if (err) {
//           return res.status(403).json({ message: 'Invalid refresh token' });
//         }

//         // Generate a new access token using the refresh token
//         const user = await User.findById(decoded.id);
//         const { accessToken } = generateTokens(user); // Generate new access token

//         // Attach the new access token to the request object for use in the protected route
//         req.accessToken = accessToken;

//         // Proceed with the next middleware
//         next();
//       });
//     } catch (err) {
//       console.error('Error verifying refresh token:', err);
//       return res.status(401).json({ message: 'No token found or invalid refresh token' });
//     }
//   } else if (token && token.startsWith('Bearer ')) {
//     // If an access token is present in the Authorization header, verify it
//     token = token.split(' ')[1]; // Get token from 'Bearer token' format
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       if (!req.user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       next();
//     } catch (err) {
//       console.error('JWT error: ', err);
//       return res.status(401).json({ message: 'Token failed' });
//     }
//   } else {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = { protect };


const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateTokens } = require('../utils/tokenUtils');  // Make sure you import the generateTokens function

// Protect middleware to verify access token
const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  // If no token in Authorization header, check cookies for refresh token
  if (!token && req.cookies.refreshToken) {
    // If no Authorization header but a refresh token cookie exists, try to refresh the token
    try {
      const refreshToken = req.cookies.refreshToken;
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token using the refresh token
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const { accessToken } = generateTokens(user); // Generate new access token

        // Attach the new access token to the request object for use in the protected route
        req.accessToken = accessToken;
        req.user = user;  // Attach user to the request object

        // Proceed with the next middleware
        next();
      });
    } catch (err) {
      console.error('Error verifying refresh token:', err);
      return res.status(401).json({ message: 'No token found or invalid refresh token' });
    }
  } else if (token && token.startsWith('Bearer ')) {
    // If an access token is present in the Authorization header, verify it
    token = token.split(' ')[1]; // Get token from 'Bearer token' format
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify using JWT_SECRET from .env
      req.user = await User.findById(decoded.id).select('-password');  // Get user details excluding password
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }
      next();
    } catch (err) {
      console.error('JWT error: ', err);
      return res.status(401).json({ message: 'Token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
