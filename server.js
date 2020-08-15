const express = require("express"),
      session = require('express-session'),
      bodyParser = require("body-parser"),
      login = require('./loginroutes.js'),
      app = express();


app.use(express.static("public"));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, resp, next){
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/forum", function(req, resp) {
  if(req.session.loggedin){
    resp.sendFile(__dirname + "/views/forum.html");
  }else{
    resp.redirect("/");
  }
});

app.get("/register", function(req, resp) {
  resp.sendFile(__dirname + "/views/register.html");
});

app.get("/", function(req, resp) {
  if(req.session.loggedin){
    resp.redirect("/forum");
  }else{
    resp.sendFile(__dirname + "/views/index.html");
  }
});

app.post("/register", login.register);
app.post("/", login.login);
app.post("/forum", login.logout);

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});