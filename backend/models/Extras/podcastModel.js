const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Podcastmodel = new Schema({
    title: {
        type:String,
        required:true
    },
    file: {
        type:String,
        required:true
    },
    duration: {
        type:Number,
        required:false
    },
    authour: {
        type:Schema.Types.ObjectId,
        required:true
    }

},{
    timestamp:true
})
module.exports = mongoose.model('podcasts',Podcastmodel)