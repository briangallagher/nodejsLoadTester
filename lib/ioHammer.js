function go(seconds, cb) {
  console.time('io job')
  console.log('starting io job %s', new Date());
  setTimeout(function () {
    console.log('finished io job %s', new Date());
    console.timeEnd('io job')
    cb();
  }, seconds * 1000);
}
exports.run = go;

// TODO: simulate a slow response time by adding items to a queue to be processed.

// simulate CPU max
// simulate Memory max
// simulate Slow Response Time max
