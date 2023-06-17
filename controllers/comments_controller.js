const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create_comment = async function (req, res) {
  try{
  let post = await Post.findById(req.body.post);
  if (post) {
    let comment = await Comment.create({
      content: req.body.content,
      user: req.cookies.user_id,
      post: req.body.post,
    });

    post.comments.push(comment);
    post.save();
    req.flash('success',"commented successfully");
    return res.redirect("back");
  }
}catch(err){
  req.flash('error',err);
}
};

module.exports.delcomment = async function (req, res) {
  // console.log(req.body.id_user," ",req.cookies.user_id," ",req.body.id_com);
  try{
  let comment = await Comment.findById(req.body.id_com);
    // comment.post.find({user:req.cookies.user_id});
    // console.log(req.body.id_com,"---",req.body.post_user);
    if (
      comment.user == req.cookies.user_id ||
      req.cookies.user_id == req.body.post_user
    ) {
      let post_id = comment.post;
      await comment.remove();
      await Post.findByIdAndUpdate(
        post_id,
        { $pull: { comments: req.body.id_com } }
      );
      req.flash('success',"commented deleted successfully");
        return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  }catch(err){
    req.flash('error',err);
  }
};
