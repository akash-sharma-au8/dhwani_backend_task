const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    default: 'Bal Vikas'
  },
  designation: {
    type: String,
    default: 'Cluster Coordinater'
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('User', userSchema)