var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
//var MONGOLAB_URI = "mongodb://wcpss:WCP55sch00l5@ds023478.mlab.com:23478/heroku_qgqdjjlx";
var MONGO_URI = "mongodb://wcpss:WCP55sch00l5@droplet.shaneo.com:27017/schools";
var SCHOOLS_COLLECTION = "schools";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var db;  // Database connection

// Connect to the database  
mongodb.MongoClient.connect(MONGO_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
//	var testDoc = db.collection('schools',findOne({}, function(err, item) {}));
//	console.log( testDoc );
  // Initialize the app.
  var server = app.listen(process.env.PORT || 8888, function () {
    var port = server.address().port;
    console.log("App now running on port ", port);
  });
});

// SCHOOLS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/schools"
 *    GET: finds all schools
 */

app.get("/schools", function(req, res) {
  db.collection(SCHOOLS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(err.message, "Failed to get schools.");
    } else {
      res.status(200).json(docs);  
			print("We think we got all the schools");
    }
  });
});

/*  "/schools/:lea_code"
 *    GET: find school by lea_code
 */

app.get("/schools/:lea_code", function(req, res) {
  db.collection(SCHOOLS_COLLECTION).findOne({ lea_code: req.params.lea_code }, function(err, doc) {
    if (err) {
      handleError(err.message, "Failed to get school");
    } else {
      res.status(200).json(doc);  
    }
  });
});

process.stdin.resume();

process.on('SIGINT', () => {
	  console.log('Got SIGINT.  Press Control-D to exit.');
});
