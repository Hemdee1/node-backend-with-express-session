const checkAuthenticatedUser = (req, res, next) => {
  const userId = req.session.userId;

  if (userId) {
    next();
  } else {
    res.status(400).json("User is not authenticated");
  }
};

module.exports = checkAuthenticatedUser;
