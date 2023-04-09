module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie("new",67);
    return res.render("home",{
        title:"chat_app"
    });
}