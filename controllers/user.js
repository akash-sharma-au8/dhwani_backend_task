const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
const { validationResult } = require("express-validator");


// Register New User
// post api/user/register
exports.registerUser = async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json({
      errors: err.array(),
    });
  }

  const { name, email, password } = req.body;

  // check if user exists
  try {

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    user = new User({
      name,
      email,
      password,
    });

    /*encrypt password using bcryptjs 
   before saving user in database*/
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // return jwt --jsonwebtoken

    const payload = {
      user: {
        id: user.id, //abstraction
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        const options = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.status(201).cookie("token", token, options).json({ token, user });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};


// User Login
// post api/user/login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isPswdMatching = await bcrypt.compare(password, user.password);

    if (!isPswdMatching) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        const options = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.status(200).cookie("token", token, options).json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};


// User Logout
// get api/user/logout
exports.logOut = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged Out",
  });
};
