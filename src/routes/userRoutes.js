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

const userRoutes = express.Router();

// SIGNUP
// LOGIN
// CHANGE PASSWORD
// LOGOUT
// UPDATE PROFILE

userRoutes.post("/signup", Signup);
userRoutes.post("/login", Login);
userRoutes.put("/change-password/:id", ChangePassword);
userRoutes.post("/logout", Logout);
userRoutes.put("/update/:id", UpdateProfile);

userRoutes.get("/autologin", autoLogin);

userRoutes.get("/", getAllUsers);

module.exports = userRoutes;
