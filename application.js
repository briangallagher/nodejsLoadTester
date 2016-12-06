var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');
require('./lib/stats');

var Prometheus = require("prometheus-client");

var client = new Prometheus();

var counter = client.newCounter({
  namespace: "counter_test",
  name: "elapsed_counters_total",
  help: "The number of counter intervals that have elapsed."
});

var gauge = client.newGauge({
  namespace: "counter_test",
  name: "random_number",
  help: "A random number we occasionally set."
});

setInterval(function () {
  counter.increment({
    period: "1sec" //period is a custom label name in this case with a value of "1sec"
  });
}, 1000);

setInterval(function () {
  counter.increment({
    period: "2sec" //creating a new series with a period label of "2sec"
  });
}, 2000);

setInterval(function () {
  gauge.set({
    period: "1sec"
  }, Math.random() * 1000);
}, 1000);

// list the endpoints which you want to make securable here
var securableEndpoints;
securableEndpoints = [];

var app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

app.use('/run', require('./lib/run.js')());

app.get("/metrics2", client.metricsFunc());

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function () {
  console.log("App started at: " + new Date() + " on port: " + port);
});
