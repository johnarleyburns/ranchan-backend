var ranchan = require('./ranchan');
var express = require('express');

var app = express();

app.get('/user', function(req, res){
  res.send(200, { name: 'tobi' });
});

exports.app = app;
