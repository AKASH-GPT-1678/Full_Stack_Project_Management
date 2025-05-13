const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    creatorid: {
        type: String,
        required: true
    },
    jobid : {
        type :String,
        required : true
    },
    userid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false  
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: false
    },
    workdone: {
        type: Number,
        default: false
    },
    location: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
