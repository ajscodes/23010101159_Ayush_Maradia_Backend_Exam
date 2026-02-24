const roleMiddleware = (...roleThatAllow) => {
  return (req, res, next) => {
    if (!roleThatAllow.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden", success: false });
    }
    next();
  };
};

export default roleMiddleware;
