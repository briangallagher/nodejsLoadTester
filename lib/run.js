var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cpuHammer = require('./cpuHammer');
var memoryHammer = require('./memoryHammer');
var ioHammer = require('./ioHammer');

function runRoute(responseTimeGauge) {
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
  run.get('/cpu', function (req, res) {
    var seconds = req.query.seconds || 15;
    cpuHammer.run(seconds, function () {
      res.status(200).send({
        'success': true
      });
    })
  });

  run.post('/memory', function (req, res) {
    var iterations = req.body.num || 9999999;
    memoryHammer.run(iterations, function () {
      res.status(200).send({
        'success': true
      });
    })
  });

  run.get('/memory', function (req, res) {
    var iterations = req.query.num || 9999999;
    memoryHammer.run(iterations, function () {
      res.status(200).send({
        'success': true
      });
    })
  });

  // GET REST endpoint - query params may or may not be populated
  run.post('/clearmemory', function (req, res) {
    memoryHammer.clear(function () {
      res.status(200).send({
        'success': true
      });
    })
  });

  run.post('/io', function (req, res) {
    var seconds = req.body.seconds;
    ioHammer.run(seconds, function () {
      // console.log('Returning from io');
      res.status(200).send({
        'success': true
      });
    })
  });

  run.get('/io', function (req, res) {
    var timeStart = +new Date();

    var seconds = req.query.seconds;
    ioHammer.run(seconds, function () {
      // console.log('Returning from io');

      var timeEnd = +new Date();
      responseTimeGauge.set({}, Math.floor((timeEnd - timeStart) / 1000));

      res.status(200).send({
        'success': true
      });
    })
  });

  return run;
}

module.exports = runRoute;
