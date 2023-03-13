const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AnnouncementModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: null
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('announcement', AnnouncementModel)