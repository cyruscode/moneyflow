"use strict";

let mongoose = require('mongoose');
mongoose.promise = require('bluebird');
let Schema = mongoose.Schema;

let TransactionSchema = new Schema({
  _creator: {type: Schema.Types.ObjectId, ref: 'Account'},
  date: {type: Date, required: true},
  amount: {type: Number, required: true},
  note: {type: String},
});

module.exports = mongoose.model('Transaction', TransactionSchema);
