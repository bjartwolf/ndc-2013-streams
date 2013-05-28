// Write video to file
var fs = require('fs');
var videoOutStream = fs.createWriteStream('droneVideo.mp4');
var videoStream = require('./droneVideoStream');
videoStream.pipe(videoOutStream);

// Write dronedata to database
// Setup database writestream
var levelup = require('levelup');
var db = levelup('./navdataDB', {
     valueEncoding: "json"});

// Pipe dronedata to database
var navDataStream = require('./droneDataStream.js');
navDataStream.pipe(db.createWriteStream());
