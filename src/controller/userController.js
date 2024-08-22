const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  try {
    // check if we have all the credentials coming from the frontend
    if (!firstName || !lastName || !userName || !email || !password) {
      throw new Error("All credentials must be included");
    }

    // getting a user from the database with the email
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new Error("There is an account with this email, log in instead");
    }

    // getting a user from the database with the username
    const existingUserWithUserName = await userModel.findOne({ userName });

    if (existingUserWithUserName) {
      throw new Error("Username chosen already");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    // create a session for the user
    req.session.userId = user.id;

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All credentials must be included");
    }

    // fetch a user with the email
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("There is no account with this email, sign up instead");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      throw new Error("Incorrect Password");
    }

    // create a session for the user
    req.session.userId = user.id;

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const ChangePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // get the id of the user from params
  const { id } = req.params;

  try {
    // using the id, fetch the user from the database
    const user = await userModel.findById(id);

    // if we can't find user, send an error message
    if (!user) {
      throw new Error("User not found");
    }

    // check if the old password matches user password in the database
    const matchedPassword = await bcrypt.compare(oldPassword, user.password);

    // if the password does not match, send an error message
    if (!matchedPassword) {
      throw new Error("Incorrect password");
    }

    // check if the new password is 8 characters long
    if (newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    // hash the new password before saving it in database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update the user data by changing the password to the new hashed password
    await userModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    res.status(200).json("Password updated successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const Logout = async (req, res) => {
  // delete the session
  req.session.destroy((error) => {
    if (error) {
      res.status(401).json(error.message);
    } else {
      res.status(200).json("Logout successfully");
    }
  });
};

const UpdateProfile = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const autoLogin = async (req, res) => {
  const id = req.session.userId;

  try {
    if (!id) {
      throw new Error("user not authenticated");
    }

    const user = await userModel.findById(id);

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

// AUTHENTICATION
// 1- JSON WEB TOKEN AUTHENTICATION
// 2- EXPRESS SESSION AUTHENTICATION
// PACKAGE TO INSTALL - EXPRESS-SESSION, CONNECT-MONGO, DOTENV
//

module.exports = {
  Signup,
  Login,
  ChangePassword,
  Logout,
  UpdateProfile,
  getAllUsers,
  autoLogin,
};
