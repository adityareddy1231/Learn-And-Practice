var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");

app.get("/search", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  var query = req.query.search;
  var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body);
      res.render("results", {
        dataToEjs: parsedData
      });
    }
  });
});

app.listen(1337, "127.0.0.1", function() {
  console.log("Server has successfully started");
});
