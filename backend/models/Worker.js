const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  experience: {
    type: String
  },
  hourlyRate: {
    type: Number
  },
  availability: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Flexible']
  },
  skills: [{
    type: String
  }],
  bio: {
    type: String
  },
  aadhaarPhoto: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Worker', workerSchema);
