const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGO_DB

const mongoConnect = async () => {
    try {
        await mongoose.connect(URI, {
            dbName: "data-flow-insights",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connection established!");
    } catch (error) {
        console.log("MongoDB not connected!", error);
    }
}

module.exports = mongoConnect;


