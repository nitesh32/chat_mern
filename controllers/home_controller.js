const posts = require("../models/post");
const user = require("../models/users");

module.exports.home = function (req, res) {
  res.cookie("new",67);

  if (req.cookies.user_id) {
    
    user.findOne({ _id: req.cookies.user_id }, function (err, user) {
      if (user) {
        posts
          .find({})
          .populate('user')
          .populate({
            path:'comments',
            populate: {
              path:'user'
            }
          })
          .exec(function (err, items) {
            return res.render("home", {
              title: "chat_app",
              posts: items,
              user :user,
            });
          });
      }
      return ;
    });
  }
    else{
    return res.redirect("/users/signin");
    }

};

