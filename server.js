var net = require('net');
var rx = require('rx');
var fs = require('fs');
var ardrone = require('ar-drone');
var events= require('events');
var drone = ardrone.createClient();
events.EventEmitter.prototype.toObservable = require('./toObservable.js');

var RGBA = require('./RGBAStream');
var PaVEParser = require('./node_modules/ar-drone/lib/video/PaVEParser');
var FrameStream = require('./FrameStream');
var FaceStream = require('./FaceStream');
var SelectStream = require('./SelectStream');
var writeToStream = require('./writeToStream');
var serializeAndWriteToStream= require('./writeToStream').serializeAndWriteToStream;
//var ffplay = require('./ffplay');
var mplayer = require('./mplayer');
var parser = new PaVEParser();
var payload = new SelectStream('payload');
var frame = new FrameStream();
var face = new FaceStream();

var fileStream = fs.createReadStream('drone.mp4');
//fileStream2.pipe(ffplay.stdin);

fileStream.pipe(mplayer.stdin);
//var socket = net.connect({ host: '192.168.1.1', port: 5555});
//socket.pipe(parser).pipe(payload).pipe(RGBA.stdin);

fileStream.pipe(RGBA.stdin);
RGBA.stdout.pipe(frame).pipe(face);
//drone.takeoff();
//var levelup = require('levelup');
// Open database, create if not exists
//var navDataDb = levelup('./navdataDB', {
//    valueEncoding: "json"});
//navDataDb.createWriteStream(*

var heightStream = drone.toObservable('navdata').
   select(function(navdata) {
        return navdata.demo.altitudeMeters;
   });

var faceStream = face.toObservable('data')
    .select(function(faces) {
        console.log(faces);
        return faces[0];
    })
    .where(function (face) {
        if (face) { return face.confidence > -1; }   
    })
    .subscribe(function (face) {
        console.log(face);
    });//timestampe det her eller noe? timestampe de man finner? spiller av alle...

/*
faceStream.combineLatest(heightStream, function (face, height) {
    if (face) {
        if (face.timeStamp > Date.now + 1000 && height > 2) {
            console.log("Vi lander!");
            drone.land();
        }
    }
});
*/
