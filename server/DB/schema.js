const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let detailSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwd: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    }
});

let details = mongoose.model('admindetail', detailSchema);

module.exports = details;