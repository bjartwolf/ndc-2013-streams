// Write video to file
var fs = require('fs');
var videoOutStream = fs.createWriteStream('droneCopy.mp4');
var videoStream = require('./droneVideoStream');
videoStream.pipe(videoOutStream);

// Write dronedata to database
// Setup database writestream
var levelup = require('levelup');
var db = levelup('./navdataDB', {
     valueEncoding: "json"});
var dbWriteStream = db.createWriteStream();

var navDataStream = require('./droneDataStream.js');
navDataStream.pipe(dbWriteStream);
