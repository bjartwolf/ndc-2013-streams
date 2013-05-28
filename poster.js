var stream = require('stream');

poster.prototype = Object.create(stream.Writable.prototype, {
  constructor: { value: poster}
});

function poster(url) {
   stream.Writeable.call(this, {objectMode: true, url: url}); 
}

poster.prototype._write= function(chunk, enc, done) { 
    request.post( {url: this.url,
                   json: chunk}, function () { done(); });
};

module.exports = poster; 
module.exports = outStream;
