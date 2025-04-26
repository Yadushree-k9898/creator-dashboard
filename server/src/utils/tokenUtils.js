const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (user) => {
  // Ensure that the user object has the required properties
  if (!user || !user._id || !user.role) {
    throw new Error("User data is incomplete for token generation.");
  }

  // Generate token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET, // Use JWT_SECRET from environment variables
    { expiresIn: '7d' } // Token expires in 7 days
  );

  return token;
};

module.exports = { generateToken };
