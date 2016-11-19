// Causes CPU to steadily increase

var async = require('async');
var pusage = require('pidusage');
var crypto = require('crypto');

// var fib = function (n, cb) {

//   // console.log('Running %s iterations', n);

//   var a = 0,
//     b = 1,
//     f = 1;

//   function calculate() {
//     return function (callback) {
//       setTimeout(function () {
//         f = a + b;
//         a = b;
//         b = f;
//         var hash = crypto.randomBytes(128).toString('hex');
//         // console.log('current hash %s', hash);
//         callback();
//       }, 5);
//     }
//   }

//   var funcs = [];
//   for (var i = 2; i <= n; i++) {
//     funcs.push(calculate());
//   }

//   async.series(funcs, function (err) {
//     console.log('done f is %s', f);
//   });
// };

// https: //gist.github.com/tkrueger/3500612

function blockCpuFor(ms) {
  var now = new Date().getTime();
  var result = 0
  while (true) {
    result += Math.random() * Math.random();
    if (new Date().getTime() > now + ms)
      return;
  }
}

function run(num, cb) {
  console.log('start cpu block, for seconds %s', num);
  cb();
  // fib(99999);
  blockCpuFor(num * 1000);
}

exports.run = run;
