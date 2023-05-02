const posts = require("../models/post");
const user = require("../models/users");

module.exports.home = function (req, res) {
  // res.cookie("new",67);
  //     const t=posts.find({}, function (err, items) {
  //         console.log("entered database");
  //             if (err) {
  //               console.log("error happening");
  //               return;
  //             }
  //             return res.render("home", {
  //                 title:"chat_app",
  //                 posts: items,
  //             });
  // //    })

  // if (req.cookies.user_id) {
    
  //   user.findOne({ _id: req.cookies.user_id }, function (err, user) {
  //     console.log("entered");
  //     if (user) {
  //       posts
  //         .find()
  //         .populate("user")
  //         .exec(function (err, items) {
  //           return res.render("home", {
  //             title: "chat_app",
  //             posts: items,
  //           });
  //         });
  //     }
  //     return ;
  //   });


    posts
          .find()
          .populate("user")
          .exec(function (err, items) {
            return res.render("home", {
              title: "chat_app",
              posts: items,
            });
          });

    // return res.redirect("/users/signin");

};
