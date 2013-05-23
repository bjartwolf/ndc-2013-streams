// STREAMS part

// Play video
var fs = require('fs');
//var ffplay = require('./ffplay'); // can use this instead of mplayer
var mplayer = require('./mplayer');
var fileStream = fs.createReadStream('drone.mp4');
fileStream.pipe(mplayer.stdin);

// Detect faces 
var faceDetector = require('./FaceDetectionStream');
var Serializer = require('./serializer');

fileStream.pipe(faceDetector.stdin);
//faceDetector.stdout.pipe(new Serializer()).pipe(process.stdout)

// RX part
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
        return 'Face at ' + face.x + ', ' + face.y + '. Width is ' + face.width + '\n';
    })
    .pipe(process.stdout)

obsFaces
    .where(function (face) { return !face || face.confidence <= 1;})
    .select(function () { return 'Nothing detected...\n';})
    .pipe(process.stdout);
