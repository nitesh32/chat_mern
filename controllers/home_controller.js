const posts = require("../models/post");
const User = require("../models/users");

// async await query 
module.exports.home = async function (req, res) {
  res.cookie("new",67);

  if (req.cookies.user_id) {
    try{
    let user = await User.findOne({ _id: req.cookies.user_id } );
      if (user) {}

        let items= await posts
          .find({})
          .populate('user')
          .populate({
            path:'comments',
            populate: {
              path:'user'
            }
          })
          
        let users= await User.find({})
        return res.render("home", {
              title: "chat_app",
              posts: items,
              user :user,
              all_users :users
        });
      }
      catch(err){
        console.log("errrr",err);
        return ;
      }

    } 
  else{
    return res.redirect("/users/signin");
  }

};

