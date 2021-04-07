const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"User",
        type:Object,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    likes:[{
        userId : {type:mongoose.Schema.Types.ObjectId , 
                  ref:'User',
                  unique:true},
        
    }],
    comments:[{
        userId : {type:mongoose.Schema.Types.ObjectId , ref:'User'}, 
        comment:String,
        likes:Number
    }],
    pictures:[
        {img:{type:String}}
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId , ref : 'User',required:true
    },
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)