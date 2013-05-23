// STREAMS part
var fs = require('fs');
var RGBA = require('./RGBAStream');
var FrameStream = require('./FrameStream');
var frame = new FrameStream();
var FaceStream = require('./FaceStream');
var face = new FaceStream();
var Serializer = require('./serializer'); 

//var ffplay = require('./ffplay'); // can use this instead of mplayer
var mplayer = require('./mplayer');
var fileStream = fs.createReadStream('drone.mp4');

fileStream.pipe(mplayer.stdin);
fileStream.pipe(RGBA.stdin);

RGBA.stdout.pipe(frame).pipe(face);
//face.pipe(new Serializer()).pipe(process.stdout)

// RX part
var rx = require('rx');
var events= require('events');
events.EventEmitter.prototype.toObservable = require('./toObservable.js');

rx.Observable.prototype.pipe = require('./writeToStream').writeToStream;

var obsFaces = face.toObservable('data')
    .select(function(faces) {
        return faces[0];
    });

var faceFound = function (face) {
    return (face && face.confidence > 1);
};

obsFaces
    .where(faceFound)
    .select(function (face) {
        return 'Face at ' + face.x + ', ' + face.y + '. Width is ' + face.width + '\n';
    })
    .pipe(process.stdout)

obsFaces
    .where(function (face) { return !faceFound(face);})
    .select(function () { return 'Nothing detected...\n';})
    .pipe(process.stdout);
