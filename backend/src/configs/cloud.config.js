
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const initializeAWS = () => {
    console.log("NODE_ENV:", process.env.NODE_ENV);

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;

    if (!accessKeyId || !secretAccessKey || !region) {
        throw new Error("❌ Missing AWS environment variables!");
    }

    const config = {
        accessKeyId,
        secretAccessKey,
        region,
    };

    AWS.config.update(config);

    return new AWS.S3();
};


const s3 = initializeAWS();
module.exports = s3;