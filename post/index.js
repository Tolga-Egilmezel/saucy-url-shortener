/*jslint node: true */
var param = require('yargs').argv;
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./db');
var options = require('../config');
var base58 = require('../post/');
var uuid = require('node-uuid');

exports.shorter = function (req, res) {
  var url = req.body.url;
  var _id = parseInt(uuid.v1());
  var hash = base58.encode(_id);
  localStorage.setItem(hash, JSON.stringify({_id: _id, short_url: hash, long_url: url }));
  return res.redirect('/');
};

exports.encode = function (num) {
  var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  var base = alphabet.length;

  var encoded = '';
  while (num) {
    var remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }

  return encoded;
}

exports.decode = function (str) {
  var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  var base = alphabet.length;

  var decoded = 0;
  while (str){
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}
