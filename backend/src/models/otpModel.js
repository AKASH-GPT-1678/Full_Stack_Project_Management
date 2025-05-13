const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    },
    used: {
        type: Boolean,
        default: false
    }
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
