var pusage = require('pidusage');

function stats(cb) {
  pusage.stat(process.pid, function (err, stat) {

    // console.log('stats cb:: ');

    // // expect(err).to.be.null
    // expect(stat).to.be.an('object');
    // expect(stat).to.have.property('cpu');
    // expect(stat).to.have.property('memory');

    console.log('Pcpu: %s', stat.cpu);
    console.log('Mem: %s', stat.memory);
    cb();
  });
}

function go() {
  setTimeout(function () {
    stats(function () {
      go();
    });
  }, 1000);
}
// go();
