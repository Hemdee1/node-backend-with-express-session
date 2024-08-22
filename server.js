// AUTHENTICATION WITH EXPRESS SESSION
// PACKAGE TO INSTALL
// 1- EXPRESS-SESSION 2- CONNECT-MONGO 3- DOTENV

const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./src/routes/blogRoutes");
const userRoutes = require("./src/routes/userRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

const SECRET = "HELLOWORLD";
const MONGO_URI = "mongodb://127.0.0.1:27017/cohort";
const PORT = 7000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up express session for authentication
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24 * 3, //3 days
      httpOnly: true,
      secure: false,
      sameSite: null,
    },
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
  })
);

// ROUTES
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("app is running on port " + PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
