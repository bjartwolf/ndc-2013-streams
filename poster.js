var stream = require('stream');
var request = require('request');

poster.prototype = Object.create(stream.Writable.prototype, {
  constructor: { value: poster}
});

function poster(url) {
   this.url = url;
   stream.Writable.call(this, {objectMode: true}); 
}

poster.prototype._write= function(chunk, enc, done) { 
    request.post( {url: this.url,
                   json: chunk}, function (err) { done(err); });
};

module.exports = poster; 
