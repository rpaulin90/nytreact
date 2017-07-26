/**
 * Created by rpaulin on 7/23/17.
 */
// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// Require History Schema
var Article = require("./models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));


// -------------------------------------------------

//MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nyt_db");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

    // We will find all the records, sort it in descending order, then limit the records to 5
    Article.find({}).sort([
        ["date", "descending"]
    ]).exec(function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
    console.log("req.body.saved_articles: " + req.body.saved_articles);

    // Here we'll save the location based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Article.create({
        title: req.body.saved_articles,
        date: Date.now()
    }, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Saved Search");
        }
    });
});


app.post("/api/delete", function(req, res) {
    console.log("req.body.saved_articles: " + req.body.saved_articles);

    // Here we'll save the location based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Article.findByIdAndRemove(

        req.body.delete_articles

    ,function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Saved Search");
        }
    });
});

app.post("/api/note", function(req, res) {
    console.log("req.body.note: " + req.body.note);

    // Here we'll save the location based on the JSON input.
    // We'll use Date.now() to always get the current date time
    Article.findOneAndUpdate({ "_id": req.body.id }, { $push: { "notes": req.body.note } }, { new: true }, function(err, newnote) {
        // Send any errors to the browser
        if (err) {
            res.send(err);
        }
        // Or send the newdoc to the browser
        else {
            res.send("added note");
        }
    });

});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});