"use strict";

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let Schema = mongoose.Schema;

let Account = require('./account.js');

let UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  lastLogin: Date,
  accounts: [Account.schema]
});


module.exports = mongoose.model('User', UserSchema);
