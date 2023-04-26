const posts = require("../models/post");

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
  //    })
  posts.find().populate("user").exec(function (err, items) {
      return res.render("home", {
        title: "chat_app",
        posts: items,
      });
    });
};
