const mongoose = require('mongoose');

const partTimeJobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    shiftDate: {
      type: Date,
      required: true
    },
    salary: {
        type: Number,
        required: true
    },
    hoursPerWeek: {
        type: Number,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        default: 'Part-time'
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    }
});

module.exports = mongoose.model('PartTimeJob', partTimeJobSchema);
