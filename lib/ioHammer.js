// have a fixed time of 1 milli second to respond
// however it goes in a Queue and it gets processed
// 1 item at a time.
// This will build up over time.

var async = require('async');

// create a queue object with concurrency 2
var q = async.queue(function (task, callback) {
  setTimeout(function () {
    callback();
  }, task.seconds);
}, 1);

setInterval(function () {
  console.log('Q length: ' + q.length());
}, 3000);

function go(seconds, cb) {
  // console.log('go!! ' + seconds);

  // add some items to the queue
  q.push({
    seconds: seconds
  }, function () {
    cb();
  });

  // console.time('io job')
  // console.log('starting io job %s', new Date());
  // setTimeout(function () {
  //   console.log('finished io job %s', new Date());
  //   console.timeEnd('io job')
  //   cb();
  // }, seconds * 1000);

}
exports.run = go;

// TODO: simulate a slow response time by adding items to a queue to be processed.

// simulate CPU max
// simulate Memory max
// simulate Slow Response Time max
