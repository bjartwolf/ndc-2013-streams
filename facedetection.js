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
rx.Observable.prototype.pipe = require('./writeToStream').writeToStream;

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
    .pipe(process.stdout)

obsFaces
    .where(function (face) { return !face || face.confidence <= 1;})
    .select(function () { return 'Nothing detected...\n';})
    .pipe(process.stdout);
