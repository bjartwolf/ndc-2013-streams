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

var arDrone = require('ar-drone');
var drone = arDrone.createClient();

var navDataStream = new stream.Readable(
  {objectMode: true}); 

navDataStream._read = function () {};

client.on('navdata', function (chunk) {
  navDataStream.push({
    key: Date.now(),
    value: chunk});
});

navDataStream.pipe(dbWriteStream);
