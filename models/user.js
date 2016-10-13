"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Account = require('./account.js');

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    lastLogin: Date,
    accounts: [Account.schema]
});

module.exports = mongoose.model('User', UserSchema);
