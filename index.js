/*jslint node: true */
var param = require('yargs').argv;
var express = require('express');
// var request = require('request');
var app = express();
var router = express.Router();
var fs = require('fs');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var uuid = require('node-uuid');
var morgan = require('morgan');
var options = require('./config');
var get = require('./get/');
var post = require('./post/');

module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());

// if (!param.debug)
//   app.use(morgan('combined', { skip: function (req, res) { return res.statusCode < 400; }, stream: options.log.stream }));


app.use('/assets', express.static(path.join(__dirname, '_site/assets'), { maxAge: 1209600000, etag: false, extensions: ['jpg', 'css', 'js'], redirect: false }));
// app.use('/share', express.static(path.join(__dirname, '_site/share'), { maxAge: 1209600000, etag: false, extensions: ['jpg'], redirect: false }));
// app.use('/404.html', express.static(path.join(__dirname, '_site/404.html')));


app.get('/longer/:url', get.longer);
app.get('/url/:hash', get.redirect);
app.post('/shorter', post.shorter);


app.use('/', function(req, res, next) {
  next();

},  function (req, res) {
    res.sendFile('index.html', options.node, function (err) {
      if (err)
        if (err.code === 'ENOENT')
          return res.redirect('/404.html');
    });
  });

app.listen(options.port, function () {
  console.log('cons', 'it\'s alive', '👻 ');
});
