const mongoose = require('mongoose');

const postschema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //  including the array of ids of all comments on this post
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
        }
    ] 


},{
    timestamps:true
});

const Post= mongoose.model('Post',postschema);
module.exports=Post;