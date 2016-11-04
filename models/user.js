"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var Account = require('./account.js');

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    lastLogin: Date,
    accounts: [Account.schema]
});



module.exports = mongoose.model('User', UserSchema);
