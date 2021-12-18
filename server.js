// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// middleware to serve the path
app.use((req, res, next) => {
  console.log('hello from id address middleware');

  req.ipaddress = req.ip;

  const software = req.get('User-Agent');
  req.software = software;

  const language = req.acceptsLanguages('en-US');
  if (language) {
    req.language = language
  };
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/whoami", (req, res) => {
  res.json({ ipaddress: req.ipaddress, language: req.language, software: req.software });
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
