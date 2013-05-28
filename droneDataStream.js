var stream = require('stream');

var arDrone = require('ar-drone');
var drone = arDrone.createClient();

var navDataStream = new stream.Readable(
  {objectMode: true}); 

navDataStream._read = function () {};

drone.on('navdata', function (chunk) {
  navDataStream.push({
    key: Date.now(),
    value: chunk});
});

module.exports.navDataStream = navDataStream;
module.exports.drone = drone;
