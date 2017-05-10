var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// serve angular front end files from root path
//app.Router().use('/', express.static('dist', { redirect: false }));
//app.use('/scripts', express.static(__dirname + '/dist/scripts'));
//app.use('/fonts', express.static(__dirname + '/dist/fonts'));
//app.use('/styles', express.static(__dirname + '/dist/styles'));
//app.use('/images', express.static(__dirname + '/dist/images'));
//
//app.all('/*', function(req, res) {
//    // Just send the index.html for other files to support HTML5Mode
//    res.sendFile('/dist/index.html', { root: __dirname });
//});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});