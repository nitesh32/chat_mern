const mongoose= require('mongoose');

const commentschema = new mongoose.Schema({
    
})

const Comment= mongoose.model('Post',commentschema);
module.exports=Comment;