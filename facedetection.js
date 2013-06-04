// STREAMS part
// *******
var fs = require('fs');
var player = require('./ffplay'); 
var videoStream = fs.createReadStream('ytdl.mp4');
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

var foundFaces = 
    obsFaces
    .where(function (face) {
        return (face && face.confidence > 1);
    });

foundFaces.select(function (face) {
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

height.combineLatest(foundFaces, function (height, face) {
        return {height: height, face:face};
    })
    .where(function (comb) {
        console.log(comb);
        return comb.face || comb.face.confidence > 1;
    })
    .where(function (comb) {
        return comb.height > 2;
    })
    .take(1)
    .subscribe(function () {
        console.log(' **** LA OSS LANDE!!! **** ');
        drone.stop();
        drone.land();
    });
