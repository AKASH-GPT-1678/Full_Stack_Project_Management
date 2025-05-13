const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");

const pathname = path.join(__dirname, "uploads/");

if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathname);
    },
    filename: function (req, file, cb) {
       
        cb(null, file.originalname)
    },
});
const Upload = multer({ storage: storage });

module.exports = {
    Upload,
    pathname
}

