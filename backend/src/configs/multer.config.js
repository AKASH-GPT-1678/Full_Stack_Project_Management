
const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");

const pathname = path.join(__dirname, "uploads/");

if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname, { recursive: true });
}

const storage = multer.memoryStorage();
const Upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

module.exports = {
    Upload,
    pathname
};