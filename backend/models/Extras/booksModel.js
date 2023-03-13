const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    authour: {
        type: String,
        default: 'unknown'
    },
    thumbnail: {
        type: Boolean,
        required: true,
        default: null
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model('books', BookModel)