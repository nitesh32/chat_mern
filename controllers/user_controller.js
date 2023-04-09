const User= require("../models/users");

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findOne({_id:req.cookies.user_id},function(err,user){
            if(user){
                return res.render("users",{
                    title:"user profile",
                    user:user
                });
            }
            // console.log(user);
            return res.redirect("/users/signin");
            
        })

    }
    else{
        return res.redirect("/users/signin");
    }
}
module.exports.Sign_up=function(req,res){
    return res.render("sign_up",{
       title: "codial | sign_up"
    });
        
}
module.exports.Sign_in=function(req,res){
    return res.render("sign_in",{
        title: "codial | sign_in"
     });
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.canfirmpassword){
        return res.redirect("back");
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding email in db");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("error in adding data to db");
                    return ;
                }
                return res.redirect("/users/signin");
            })
        }
        else{
            return res.redirect("back");
        }
    });

}
module.exports.create_session =function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in signing in");
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect("/users/profile");

        }
        else{
            return res.redirect('back');
        }
    })
}
let x = Math.random();
module.exports.out=function(req,res){
    if(req.cookies.user_id){
        res.cookie('user_id',x);
        return res.redirect("/users/signin");
    }
} 