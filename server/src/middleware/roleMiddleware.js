const allowRoles = (...roles) => {
    return (req, res, next) => {
      // Ensure that the user has the required role
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied, insufficient role' });
      }
      next();
    };
  };
  
  module.exports = { allowRoles };
  