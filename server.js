// server.js

// modules =======================
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	app = express(),
	morgan = require('morgan'),
	mongoose = require('mongoose');

// configuration =======================

// config files
var config = require('./config/db.json')[process.env.NODE_ENV || 'development'];
// var db = require('./config/db');

var port = process.env.PORT || 8080;
mongoose.connect(config.db_url);

app.use(express.static(__dirname + '/public')); // static files location, public/img will be img/ for users
app.use(morgan()); // log requests to console
app.use(bodyParser()); // pull info from html in POST
app.use(methodOverride()); // simulate DELETE and PUT

// congiguration =======================
require('./app/goal'); // configure model

require('./app/routes')(app); // configure routes

// start app =======================
app.listen(port);
console.log('Starting app on port ' + port);
exports = module.exports = app;
