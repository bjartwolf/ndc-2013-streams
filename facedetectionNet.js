// STREAMS part
// *******
var fs = require('fs');
var player = require('./mplayer'); //var player = require('./ffplay'); 
var videoStream = fs.createReadStream('drone.mp4');
//var videoStream = require('./droneVideoStream');

videoStream.pipe(player.stdin);

// Detect faces 
var faceDetector = require('./FaceDetectionStream');
videoStream.pipe(faceDetector.stdin);

// Print the stream
//var Serializer = require('./serializer');
//faceDetector.stdout.pipe(new Serializer()).pipe(process.stdout)

// RX PART
// *******
var rx = require('rx');
var events= require('events');
events.EventEmitter.prototype.toObservable = require('./toObservable.js');
rx.Observable.prototype.rxpipe = require('./writeToStream').writeToStream;


var droneModule = require('./droneDataStream.js');
var drone = droneModule.drone; 
drone.takeoff();
drone.after(5000, function () {
    drone.up(0.1);
});

// Fake data, slettes
altitude = 0;
setInterval(function () { altitude += 0.08; drone.emit('navdata', {demo: {altitudeMeters: altitude}});} , 100);

// poster all navdata using a writable stream
var Poster = require('./poster');
droneModule.navDataStream.pipe(new Poster('http://localhost:40000/navdata'));
faceDetector.stdout.pipe(new Poster('http://localhost:40000/faces'));


// Delete this, this is just to see that the data actually is posted 
var express = require('express');
var app = express();
app.use(express.bodyParser());
app.post('/faces', function (req, res) {
    console.log(req.body); 
    res.send('ok');
    });
app.post('/navdata', function (req, res) {
    console.log(req.body); 
    res.send('ok');
    });

app.listen(40000);

