const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobModel = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    status: {
        type:String,
        enum:['active','deavtivated'],
        default:'active',
        required:true
    },
    createdBy: {
        type:Schema.Types.ObjectId,
        required:true
    }
},{
    timestamp:true
})
module.exports = mongoose.model('jobs', JobModel)