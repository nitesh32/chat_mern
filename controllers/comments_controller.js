const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create_comment = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
      if(err){
          console.log("error at comments_controller line 7");
          return res.redirect("back");
      }
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          user: req.cookies.user_id,
          post: req.body.post,
        },
        function (err, comment) {
          if (err) {
            console.log("eerror occured at comments controller line _ 11");
            return res.redirect("back");
          }
          post.comments.push(comment);
          post.save();
          return res.redirect("back");
        }
      );
    }
  });
};
