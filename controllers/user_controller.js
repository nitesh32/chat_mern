const User = require("../models/users");

module.exports.profile = async function (req, res) {
  try {
    if (req.cookies.user_id) {
      let user = await User.findOne({ _id: req.cookies.user_id });
      if (user) {
        return res.render("users", {
          title: "user profile",
          user: user,
        });
      }
      return res.redirect("/users/signin");
    } else {
      return res.redirect("/users/signin");
    }
  } catch (err) {
    console.log("error", err);
  }
};

module.exports.friend_profile = async function (req, res) {
  // var st_id=req.path.slice(16, );
  // console.log(req.params.id);

  let user = await User.findOne({ _id: req.params.id });
  try {
    if (user) {
      return res.render("profile", {
        title: "user friend_profile",
        user: user,
        opener_user: req.cookies.user_id,
      });
    }
    // console.log(user);
    return res.redirect("/users/signin");
  } catch (err) {
    console.log("error", err);
  }
};
module.exports.update = async function (req, res) {
  // if(req.user.id)
  try {
    if (req.params.id == req.cookies.user_id) {
      let done = await User.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name, email: req.body.email },
      });
      return res.redirect("/");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
  }
};
module.exports.Sign_up = async function (req, res) {
  
  return res.render("sign_up", {
    title: "codial | sign_up",
  });
};
module.exports.Sign_in = async function (req, res) {
  return res.render("sign_in", {
    title: "codial | sign_in",
  });
};

module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.canfirmpassword) {
      req.flash('error',"password does not match");
      return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      let user = await User.create(req.body);
      req.flash('success',"successfully sign up there");
      return res.redirect("/users/signin");
    } else {
      req.flash('error',"user already exist");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
  }
};
module.exports.create_session = async function (req, res) {
    try{
  let user =await User.findOne({ email: req.body.email });
    if (user) {
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      res.cookie("user_id", user.id);
      req.flash('success','succesfully logged in');
      return res.redirect("/users/profile");
    } else {
      return res.redirect("back");
    }
}catch(err){
    console.log("Error",err);
}
};
let x = Math.random();
module.exports.out = async function (req, res) {
  if (req.cookies.user_id) {
    res.cookie("user_id", x);

    req.flash('success','succesfully logged out ');
    return res.redirect("/users/signin");
    
  }
};
