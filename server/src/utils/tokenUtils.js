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
