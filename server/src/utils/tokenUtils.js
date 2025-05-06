// const jwt = require('jsonwebtoken');

// // Function to generate JWT token
// const generateToken = (user) => {
//   // Ensure that the user object has the required properties
//   if (!user || !user._id || !user.role) {
//     throw new Error("User data is incomplete for token generation. Ensure the user object has '_id' and 'role' properties.");
//   }

//   // Generate token with role and id
//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET, // Ensure this is set in environment variables
//     { expiresIn: '7d' } // Token expires in 7 days, adjust if necessary
//   );

//   return token;
// };

// module.exports = { generateToken };


// const jwt = require('jsonwebtoken');

// // Function to generate JWT tokens (Access Token and Refresh Token)
// const generateTokens = (user) => {
//   // Ensure that the user object has the required properties
//   if (!user || !user._id || !user.role) {
//     throw new Error("User data is incomplete for token generation. Ensure the user object has '_id' and 'role' properties.");
//   }

//   // Generate access token with role and id (short-lived)
//   const accessToken = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET, // Ensure this is set in environment variables
//     { expiresIn: '1h' } // Token expires in 1 hour, adjust if necessary
//   );

//   // Generate refresh token (long-lived)
//   const refreshToken = jwt.sign(
//     { id: user._id }, // Only include the user ID in the refresh token
//     process.env.REFRESH_TOKEN_SECRET, // Ensure you have a separate secret for the refresh token
//     { expiresIn: '7d' } // Token expires in 7 days, adjust if necessary
//   );

//   return { accessToken, refreshToken };
// };

// module.exports = { generateTokens };


const jwt = require('jsonwebtoken');

/**
 * Generate both an access token and a refresh token for a user.
 * @param {Object} user - The user object (must have _id and role).
 * @returns {Object} - { accessToken, refreshToken }
 */
const generateTokens = (user) => {
  if (!user || !user._id || !user.role) {
    throw new Error(
      "User data is incomplete for token generation. Ensure the user object has '_id' and 'role' properties."
    );
  }

  // Short-lived access token
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Long-lived refresh token
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

module.exports = { generateTokens };
