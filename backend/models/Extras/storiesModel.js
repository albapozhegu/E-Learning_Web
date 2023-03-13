const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StoriesModel = new Schema({
    createdBy:{
        type:Schema.Types.ObjectId,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{
    timestamp:true
})
module.exports = mongoose.model('stories', StoriesModel)