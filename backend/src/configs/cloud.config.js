const { Storage } = require("@google-cloud/storage");



const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GCP_FILE,
});

const bucketName = process.env.BUCKET_NAME;




module.exports = {
    storage,
    bucketName  
}