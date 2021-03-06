const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const User = require("../models/user");


// get api/auth
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );

    res.status(200).json({
      user
    });
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router