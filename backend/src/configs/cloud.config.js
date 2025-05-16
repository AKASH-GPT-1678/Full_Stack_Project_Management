const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");

function initializeStorage() {
    let storage;
    console.log(process.env.NODE_ENV);

    if (process.env.NODE_ENV === "development") {
        storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.GCP_FILE
        });
    } else if (process.env.NODE_ENV === "production") {
        storage = new Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.GCP_FILE
        });
    }

    return storage;
}

const storage = initializeStorage();

module.exports = {
    storage
};
