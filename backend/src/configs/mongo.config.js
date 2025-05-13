const mongoose = require("mongoose");

const url = process.env.MONGO_URI;
async function connectMongo() {



    try {

        await mongoose.connect(url);
        console.log("Connected to MongoDB");

    } catch (error) {
        console.log(error);

    }

}


module.exports = {
    connectMongo
}