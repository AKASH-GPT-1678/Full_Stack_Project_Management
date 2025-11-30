// upload.js
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = require("../configs/cloud.config.js");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
const uploadToS3 = (file, folder = "uploads") => {
    return new Promise((resolve, reject) => {
        const ext = path.extname(file.originalname);
        const fileName = `${folder}/${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}${ext}`;

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
        };

        s3.upload(params, (err, data) => {
            if (err) return reject(err);
            resolve({
                path: fileName,
                url: data.Location,
            });
        });
    });
};

module.exports = { upload, uploadToS3 };