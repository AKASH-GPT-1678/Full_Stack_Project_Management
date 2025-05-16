const { Storage } = require("@google-cloud/storage");
const path = require("path");


const credentials = JSON.parse(process.env.GCP_FILE);
const storage = new Storage({
  projectId: credentials.project_id, 
  credentials,
});


const bucketName = process.env.BUCKET_NAME;




module.exports = {
    storage,
    bucketName  
}