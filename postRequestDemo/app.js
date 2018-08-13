var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var friends = ["Sid", "Akshay", "Tej", "Venky", "Avinash"];
var fs = require("fs");
var path = "Test.txt";

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/friends", function (req, res) {
    res.render("friends", { friends: friends });
});

app.post("/addfriends", function (req, res) {
    var friendToAdd = req.body.newFriend;
    friends.push(friendToAdd);
    res.redirect("/friends");
    fs.appendFile(path, friendToAdd + ", ", function (error) {
        if (error) {
            console.error("write error:  " + error.message);
        }
        else {
            console.log("Successful Write to " + path);
        }
    });
});

app.listen(1337, "127.0.0.1", function () {
    console.log("Server has started");
});
