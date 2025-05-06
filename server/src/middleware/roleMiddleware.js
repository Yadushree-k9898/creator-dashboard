
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log('No user found on request object.');
      return res.status(401).json({ message: 'Not authorized, user missing' });
    }

    const userRole = req.user.role?.toLowerCase();
    const allowedRoles = roles.map(r => r.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      console.log('Role check failed:', { userRole, allowedRoles });
      return res.status(403).json({ message: 'Access denied, insufficient role' });
    }
    next();
  };
};

  
module.exports = { allowRoles };