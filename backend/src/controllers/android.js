const { uploadToS3 } = require("../configs/multer.config.js");


const androidPlans = (req, res) => {
    const { file } = req.file;

    res.status(200).json(Plans);




}

const testUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file received" });
    }

    // Upload the file to S3
    const uploadedFile = await uploadToS3(req.file);

    return res.status(200).json({
      success: true,
      message: "Upload successful",
      url: uploadedFile.url   // S3 file URL
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message
    });
  }
};

module.exports = { testUpload  , androidPlans};

