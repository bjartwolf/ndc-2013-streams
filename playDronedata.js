// Write dronedata to database
// Setup database writestream
var levelup = require('levelup');
var db = levelup('./navdataDB', {
     valueEncoding: "json"});

db.createReadStream().pipe(process.stdout);
