"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.promise = require('bluebird');



var TransactionSchema = new Schema({
  _creator: {type: Schema.Types.ObjectId, ref: 'Account'},
  date: {type: Date, required: true},
  amount: {type: Number, required: true},
  note: {type: String},
});

module.exports = mongoose.model('Transaction', TransactionSchema);
