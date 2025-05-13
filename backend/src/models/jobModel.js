const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  wages: {
    type: Number,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  expire: {
    type: Date,
    required: true,
    index : { expires: 0 }
  }
}, {
  timestamps: true
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
