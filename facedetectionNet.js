var fs = require('fs');
//var videoStream = fs.createReadStream('drone.mp4');
var videoStream = require('./droneVideoStream');
// Detect faces 
var faceDetector = require('./FaceDetectionStream');
videoStream.pipe(faceDetector.stdin);
var rx = require('rx');
var events= require('events');
events.EventEmitter.prototype.toObservable = require('./toObservable.js');
rx.Observable.prototype.rxpipe = require('./writeToStream').writeToStream;

var droneModule = require('./droneDataStream.js');
var drone = droneModule.drone; 
drone.disableEmergency();
drone.
    after(5000, function () {
        this.takeoff();
    }).
    after(5000, function () {
        this.front(0.05);
        this.up(0.2);
});
// Fake data, slettes
//altitude = 0;
//setInterval(function () { altitude += 0.008; drone.emit('navdata', {demo: {altitudeMeters: altitude}});} , 100);
// poster all navdata using a writable stream
var Poster = require('./poster');
var programId = 4;
droneModule.navDataStream.pipe(new Poster('http://localhost:50935/programs/' + programId +'/navdata'));
faceDetector.stdout.pipe(new Poster('http://localhost:50935/programs/' + programId +'/faces'));
var request = require('request');
request('http://localhost:50935/programs/' + programId, function (error, res, body) {
    if (!error && res.statusCode == 200) {
        drone.stop();
        drone.land();
        console.log("BODY: " + body);
        console.log("LANDING");
    } else {
        console.log("shit, this demo is broken...");
        drone.animate('flipLeft', 1500);
    }
});


