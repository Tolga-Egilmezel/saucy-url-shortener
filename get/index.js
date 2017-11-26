/*jslint node: true */
var param = require('yargs').argv;
var LocalStorage = require('node-localstorage').LocalStorage;
// localStorage = new LocalStorage('./db');
var base58 = require('../post/');
var options = require('../config');

exports.longer = function (req, res) {
  var hash = base58.decode(req.params.url);
  var result = localStorage.getItem(hash);
  res.send(result);
};

exports.redirect = function (req, res) {
  var result = JSON.parse(localStorage.getItem(req.params.hash));
  return res.redirect('http://' + result.long_url);
};
