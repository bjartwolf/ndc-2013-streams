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
var droneData = require('./droneDataStream.js')
droneData.navDataStream.pipe(db.createWriteStream());

var drone = droneData.drone;
drone.takeoff();
drone
    .after(5000, function () {
        this.clockwise(0.5);
    })
    .after(1000, function () {
        this.up(0.1);
    })
    .after(1000, function () {
        this.front(0.1);
    })
    .after(5000, function () {
        this.stop();
        this.land();
    });
