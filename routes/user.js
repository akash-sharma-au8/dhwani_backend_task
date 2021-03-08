const express = require("express");
const router = express.Router();
const { check} = require("express-validator");

const { registerUser,login,logOut } = require("../controllers/user");

// post api/user/register
router.post(
  "/register",
  [
    check("name", "please enter your name").not().isEmpty(),
    check("email", "please enter a valid email").isEmail(),
    check("password", "please enter a password with atleast 6 char").isLength({
      min: 6,
    }),
  ],
  registerUser
);

// post api/user/login
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

// get api/user/logout
router.get("/logout", logOut);

module.exports = router;
