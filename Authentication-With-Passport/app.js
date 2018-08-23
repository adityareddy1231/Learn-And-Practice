var express = require('express'),
  mongoose = require("mongoose"),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  localStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  User = require('./models/user'),
  app = express();

mongoose.connect("mongodb://localhost/authentication-demo");

app.use(require('express-session')({
  secret: "This is my personal secret statement",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
  extended: true
}));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

//---------------
// --- Routes ---
// --------------
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", checkLoggedIn, function(req, res) {
  res.render("secret");
});

//Auth Routes
//show sign up form
app.get("/register", function(req, res) {
  res.render("register");
});

//handling user signup
app.post("/register", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.register(new User({username: username}), password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    } else {
      passport.authenticate("local")(req, res, function() {
        console.log(user);
        res.redirect("secret");
      });
    }
  });
});


//LOGIN Routes
//show login Form
app.get("/login", function(req, res) {
  res.render("login");
});

//login post route
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
  console.log("User authenticated");
});

//LOGOUT Routes
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

//check if logged
function checkLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    console.log("yes");
    return next();
  }
  console.log("no");
  res.redirect("/login");
}

//Start server on a port on locahost
app.listen(1337, "127.0.0.1", function() {
  console.log("Server has started!");
});
