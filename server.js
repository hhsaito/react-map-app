const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Require Schemas
var Properties = require("./server/model");

// Create Instance of Express
const app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration
mongoose.connect("mongodb://react-map:react!map!p@ssword@ds145380.mlab.com:45380/heroku_dssg5hgc");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

app.post("/add", function(req, res) {
  var newLocation = new Properties(req.body);

  console.log(req.body);

  newLocation.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Any non API GET routes will be directed to our React App and handled by React Router
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Listener
app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});