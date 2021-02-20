process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');

// Load the 'express' module
const configureExpress = require('./config/express');

var db = mongoose();

// Create a new Express application instance
const app = configureExpress();

app.listen(5000);

console.log('Server running at http://localhost:5000/');

module.exports = app;


