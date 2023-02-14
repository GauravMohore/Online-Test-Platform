const mongoose = require('mongoose');
require('dotenv/config');

const connectDB = async () => {
    await mongoose.connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }, (err) => {
        if (err) {
            console.log(err)
        }
    });
    console.log("MongoDB Connection done Successfully...");
}

module.exports = connectDB;