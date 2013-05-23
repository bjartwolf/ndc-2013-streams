var rx = require('rx');
var fs = require('fs');
var events= require('events');
events.EventEmitter.prototype.toObservable = require('./toObservable.js');

var RGBA = require('./RGBAStream');
var FrameStream = require('./FrameStream');
var FaceStream = require('./FaceStream');
//var ffplay = require('./ffplay'); // can use this instead of mplayer
var mplayer = require('./mplayer');
var frame = new FrameStream();
var face = new FaceStream();

var fileStream = fs.createReadStream('drone.mp4');

fileStream.pipe(mplayer.stdin);
fileStream.pipe(RGBA.stdin);

RGBA.stdout.pipe(frame).pipe(face);

var faceStream = face.toObservable('data')
    .select(function(faces) {
        return faces[0];
    });

faceStream
    .where(function (face) {
            return !face || face.confidence <= -1; 
    })
     .subscribe(function () {
        console.log("NO FACE DETECTED");
    });

faceStream
    .where(function (face) {
        if (face) { return face.confidence > -1; }   
    })
    .select(function (face) {
        return "Face at " + face.x + ", " + face.y + ". Width is " + face.width;
    })
     .subscribe(function (face) {
        console.log(face);
    });
