const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  addChild,
  getChildren,
  getChildDetails,
} = require("../controllers/child");

// get api/child/add
router.post("/add", auth, addChild);

// get api/child
router.get("/", auth, getChildren);

// getSingleChild api/child/:id
router.get("/:id", auth, getChildDetails);

module.exports = router;
