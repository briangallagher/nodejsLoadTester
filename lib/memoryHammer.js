// Causes memory to steadily increase
// but not be adverse on CPU

var async = require('async');
var text = require('./text.js');

var data = [];

function run(n, cb) {

  console.log('running with %s', n);

  function addToMemory() {
    return function (callback) {
      setTimeout(function () {
        data.push(text.getData());
        callback();
      }, 1);
    }
  }

  var funcs = [];
  for (var i = 0; i <= n; i++) {
    data.push(text.getData());
    // funcs.push(addToMemory());
  }

  async.series(funcs, function () {
    console.log('done data has %s items in memory', data.length);
    cb();
  });
}

// console.log('start memory hammer');

exports.run = run;
