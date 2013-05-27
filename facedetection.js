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

// RX PART
// *******
var rx = require('rx');
var events= require('events');
events.EventEmitter.prototype.toObservable = require('./toObservable.js');
rx.Observable.prototype.rxpipe = require('./writeToStream').writeToStream;

var obsFaces = faceDetector.stdout.toObservable('data')
    .select(function(faces) {
        return faces[0];
    });

obsFaces
    .where(function (face) {
        return (face && face.confidence > 1);
    })
    .select(function (face) {
        return 'Face at found. Width is ' + face.width + '\n';
    })
    .rxpipe(process.stdout);

obsFaces
    .where(function (face) { return !face || face.confidence <= 1;})
    .select(function () { return 'Nothing detected...\n';})
    .rxpipe(process.stdout);

var ardrone = require('ar-drone');
var drone = ardrone.createClient();

drone.takeoff();
drone.after(5000, function () {
    drone.up(0.1);
});


// Fake data, slettes
altitude = 0;
setInterval(function () { altitude += 0.08; drone.emit('navdata', {demo: {altitudeMeters: altitude}});} , 100);

var height= drone.toObservable('navdata')
    .where(function(navdata) { return navdata && navdata.demo && navdata.demo.altitudeMeters;})
    .select(function(navdata) { return navdata.demo.altitudeMeters;})

var sendtLandesignal;
height.combineLatest(obsFaces, function (height, face) {
    if (face && face.confidence > 1 && height > 2) {
        if (!sendtLandesignal) {
            console.log(' **** LA OSS LANDE!!! **** ');
            drone.stop();
            drone.land();
            sendtLandesignal = true; 
        }
    }
}).subscribe(function () { ;});
