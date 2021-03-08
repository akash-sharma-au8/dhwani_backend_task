const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Sex: {
    type: String,
    required: true,
    enum: {
      values: ["Male", "Female", "Other"],
    },
  },
  DateOfBirth: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required:true
    }
  },
  motherName: {
    type: String,
    required: true,
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'State',
    required: true,
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'District',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
},{timestamps:true});

module.exports = mongoose.model("Child", childSchema);
