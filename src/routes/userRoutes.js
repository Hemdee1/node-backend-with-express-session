const express = require("express");
const {
  Signup,
  ChangePassword,
  Login,
  Logout,
  UpdateProfile,
  getAllUsers,
  autoLogin,
} = require("../controller/userController");
const checkAuthenticatedUser = require("../middleware/checkAuthenticatedUser");

const userRoutes = express.Router();

// SIGNUP
// LOGIN
// CHANGE PASSWORD
// LOGOUT
// UPDATE PROFILE

userRoutes.post("/signup", Signup);
userRoutes.post("/login", Login);
userRoutes.post("/logout", Logout);

// add authorization so that only logged in user can have access to the route
userRoutes.put("/change-password", checkAuthenticatedUser, ChangePassword);
userRoutes.put("/update", checkAuthenticatedUser, UpdateProfile);

userRoutes.get("/autologin", autoLogin);

userRoutes.get("/", getAllUsers);

module.exports = userRoutes;
