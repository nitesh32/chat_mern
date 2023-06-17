const Post = require("../models/post");
const Comments = require("../models/comment");
// synchronous code for this module create
// module.exports.create = function(req,res){

//     Post.create({
//         content:req.body.content,
//         user:req.cookies.user_id   
//     },function(err,Post){
//         if(err){
//             console.log("error happenning at posting ");
//             return;
            
//         }
//         return res.redirect("back");
//     })
// }

//async code for module create
module.exports.create = async function(req,res){

    try{
    let post=await Post.create({
        content:req.body.content,
        user:req.cookies.user_id   
    })
    if(req.xhr){
        return res.status(200).json({
            data : {
                post:post,
            },
            message : "post created with ajax",
        });
    }
    req.flash('success',"posted successfully");
    return res.redirect("back");
    }
    catch(err){
        req.flash('error',err);
        return ;
    }
}

module.exports.destroy = async function(req,res){
    try{
    let post = await Post.findById(req.body.id)

        if(post.user==req.cookies.user_id){
            
            await post.delete();
            await Comments.deleteMany({post:req.body.id});
        }
        req.flash('success',"posted deleted successfully");
        return res.redirect("back");
    }
    catch(err){
        req.flash('error',err);
    }

};
