const express = require("express");
const app= express();
const port=8000;

// sass middleware

const sassMiddleware = require("node-sass-middleware");

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'


}));



const cookieParser= require("cookie-parser");



app.use(express.urlencoded());
app.use(cookieParser());

// database connection 
const db = require("./config/mongoose") ;
const user = require("./models/users");
const posts = require("./models/post");
const { Collection } = require("mongoose");


app.use(express.static("assets"));
const expresslayouts= require("express-ejs-layouts");
const { urlencoded } = require("express");
app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use('/',require("./routes"));

app.set("view engine","ejs");
app.set("views","./views");





app.listen(port,function(err){
    if(err){
        console.log(`Error in runnning server : ${err}`);
    }
    console.log(`Server is running on port numer : ${port}`);
})