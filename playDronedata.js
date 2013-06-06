var levelup = require('levelup');
var db = levelup('./navdataDB', {
     valueEncoding: "json"});
var Serializer = require('./serializer.js');
db.createReadStream().pipe(new Serializer()).pipe(process.stdout);
//var SlowStream = require('./slowStream.js');
//db.createReadStream().pipe(new SlowStream(100)).pipe(new Serializer()).pipe(process.stdout);
