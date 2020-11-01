var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('*', (req, res) => res.sendFile(path.resolve('react-client', 'dist', 'index.html')));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

