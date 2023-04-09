const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat_app');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error here connecting to db'));

db.once('open',function(){
    console.log("succesfully opened db");
});

module.exports=db;
