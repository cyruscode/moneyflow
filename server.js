"use strict";
var express = require('express');

const http = require('http');
const path = require('path');
const ejs = require('ejs');

var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;        // set our port
const config = require('./config');
const mongoose = require('mongoose');
mongoose.promise = require('bluebird');
mongoose.connect(config.db.development); // connect to our db


// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express

// more routes for our API will happen here

router.use("/users", require("./routes/user-route.js"));
router.use("/users", require("./routes/account-route.js"));
router.use("/users", require("./routes/transaction-route.js"));


//Set static folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

