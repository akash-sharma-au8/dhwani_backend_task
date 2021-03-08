const express = require("express");
const { getAllStates, createState } = require("../controllers/state");
const router = express.Router();
const auth = require("../middlewares/auth");

// post api/state/create
router.post("/create", auth, createState);

// get api/state
router.get("/", auth, getAllStates);

module.exports = router;
