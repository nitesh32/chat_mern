const Post = require("../models/post");

module.exports.create = function(req,res){

    Post.create({
        content:req.body.content,
        user:req.cookies.user_id   
    },function(err,Post){
        if(err){
            console.log("error happenning at posting ");
            return;
            
        }
        return res.redirect("back");
    })
}