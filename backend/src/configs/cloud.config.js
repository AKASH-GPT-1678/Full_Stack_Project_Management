const { Storage } = require("@google-cloud/storage");



const storage = new Storage({
    projectId: process.env.ProjectId,
    keyFilename: process.env.GCP_Json_file,
});

const bucketName = process.env.BUCKET_NAME;




module.exports = {
    storage,
    bucketName  
}