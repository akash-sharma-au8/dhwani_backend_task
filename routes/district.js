const express = require("express");
const { getAllDistrict, createDistrict } = require("../controllers/district");
const router = express.Router();
const auth = require("../middlewares/auth");

// post api/district/create
router.post("/create", auth, createDistrict);

// get api/district
router.get("/", auth, getAllDistrict);

module.exports = router;
