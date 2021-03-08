const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('State',stateSchema)