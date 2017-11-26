/*jslint node: true */
'use strict';

var options = {
  port: 4000,
  node: {
    root: __dirname + '/_site',
    dotfiles: 'deny',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Cache-Control': 'public, max-age=0',
    },
  },
}

module.exports = options;
