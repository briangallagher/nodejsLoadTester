var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cpuHammer = require('./cpuHammer');
var memoryHammer = require('./memoryHammer');
var ioHammer = require('./ioHammer');

function runRoute() {
  var run = new express.Router();
  run.use(cors());
  run.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  run.post('/cpu', function (req, res) {
    var seconds = req.body.seconds || 15;
    cpuHammer.run(seconds, function () {
      res.status(200).send({
        'success': true
      });
    })
  });

  // GET REST endpoint - query params may or may not be populated
  run.post('/memory', function (req, res) {
    var iterations = req.body.num || 9999999;
    memoryHammer.run(iterations, function () {
      res.status(200).send({
        'success': true
      });
    })
  });

  // GET REST endpoint - query params may or may not be populated
  run.post('/io', function (req, res) {
    var seconds = req.body.seconds;
    ioHammer.run(seconds, function () {
      res.status(200).send({
        'success': true
      });
    })
  });

  return run;
}

module.exports = runRoute;
