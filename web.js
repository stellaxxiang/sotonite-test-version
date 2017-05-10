var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});
app.get('/atm', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});