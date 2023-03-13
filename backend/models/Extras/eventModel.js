const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventModel = new Schema({
    date:{
        type:Date,

    },
     duration:{
        type:Number,
        required:false,
        default:0
     },
     title:{
        type:String,
        required:true
     },
     host:{
        type:Schema.Types.ObjectId,
        ref:'users',
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
module.exports = mongoose.model('events',EventModel)