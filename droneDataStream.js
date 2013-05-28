var stream = require('stream');

var arDrone = require('ar-drone');
var drone = arDrone.createClient();

var navDataStream = new stream.Readable(
  {objectMode: true}); 

navDataStream._read = function () {};

client.on('navdata', function (chunk) {
  navDataStream.push({
    key: Date.now(),
    value: chunk});
});

module.exports = navDataStream;
