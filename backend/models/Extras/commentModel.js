const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentModel = new Schema({
    createdBy:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'users'
    },
    forumId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'forums'
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','deactivated'],
        default:'active'
    }
},{
    timestamp:true
})
module.exports = mongoose.model('comments', CommentModel)