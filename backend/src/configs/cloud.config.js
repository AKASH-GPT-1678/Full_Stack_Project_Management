
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const initializeAWS = () => {
    console.log("NODE_ENV:", process.env.NODE_ENV);

    let accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    let secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    let region = process.env.AWS_REGION;

    // If any variable is missing, try fallback: AWS_CREDENTIALS (base64)
    if (!accessKeyId || !secretAccessKey || !region) {
        const encoded = process.env.AWS_CREDENTIALS;
        if (!encoded) {
            throw new Error("❌ AWS credentials missing: Provide ENV keys or AWS_CREDENTIALS");
        }

        try {
            const decoded = JSON.parse(
                Buffer.from(encoded, "base64").toString("utf-8")
            );
            accessKeyId = decoded.accessKeyId;
            secretAccessKey = decoded.secretAccessKey;
            region = decoded.region;
        } catch (err) {
            throw new Error("❌ Failed to decode AWS_CREDENTIALS: " + err.message);
        }
    }

    // Final AWS Config (same for Dev & Prod)
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