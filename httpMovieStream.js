var http = require('http');
var options = {
  hostname: 'www.tools4movies.com',
  port: 80,
  path: '/trailers/1012/Broken%20City.mp4',
  method: 'GET'
};
var stream = require('stream');
var outStream = new stream.PassThrough();

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  res.pipe(outStream);
});
req.end();

module.exports = outStream;
