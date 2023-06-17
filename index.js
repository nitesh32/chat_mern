const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const app = express();
const port = 8000;

// sass middleware

const sassMiddleware = require("node-sass-middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

const cookieParser = require("cookie-parser");

app.use(express.urlencoded());
app.use(cookieParser());

// database connection
const db = require("./config/mongoose");
const user = require("./models/users");
const posts = require("./models/post");
const { Collection } = require("mongoose");
const session = require("express-session");
const customMware = require("./config/middleware");



app.use(express.static("assets"));
const expresslayouts = require("express-ejs-layouts");
const { urlencoded } = require("express");
app.use(expresslayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("trust proxy", 1);
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:36*24 },
  })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setFlash);




app.use("/", require("./routes"));

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in runnning server : ${err}`);
  }
  console.log(`Server is running on port numer : ${port}`);
});
