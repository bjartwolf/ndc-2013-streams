var fs = require('fs');
var player = require('./mplayer'); //var player = require('./ffplay'); 
var videoStream = fs.createReadStream('drone.mp4');
//var videoStream = require('./droneVideoStream');

videoStream.pipe(player.stdin);

var faceDetector = require('./FaceDetectionStream');
videoStream.pipe(faceDetector.stdin);

// RX PART
// *******
var rx = require('rx');
var events= require('events');

// This allows us to make rx Observables of streams
// and write back to streams
events.EventEmitter.prototype.toObservable = require('./toObservable.js');
rx.Observable.prototype.rxpipe = require('./writeToStream').writeToStream;


// Select == map, where == filter
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
