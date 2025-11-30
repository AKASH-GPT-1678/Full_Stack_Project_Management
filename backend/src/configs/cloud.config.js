
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const initializeAWS = () => {
    console.log("NODE_ENV:", process.env.NODE_ENV);

    let config = {};

    if (process.env.NODE_ENV === "development") {
        // Local Development
        if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
            throw new Error("❌ AWS credentials not set in .env");
        }

        config = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        };
    } else {
        // PRODUCTION MODE — using Base64 encoded credentials
        const encoded = process.env.AWS_CREDENTIALS;

        if (!encoded) {
            throw new Error("❌ AWS_CREDENTIALS not found in environment");
        }

        let credentials;
        try {
            credentials = JSON.parse(
                Buffer.from(encoded, "base64").toString("utf-8")
            );
        } catch (err) {
            throw new Error("❌ Failed to decode AWS_CREDENTIALS: " + err.message);
        }

        config = {
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            region: credentials.region,
        };
    }

    AWS.config.update(config);
    return new AWS.S3();
};

const s3 = initializeAWS();
module.exports = s3;