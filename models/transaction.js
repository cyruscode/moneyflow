"use strict";

var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema   = new Schema({
    date : {type:Date, required: true},
    amount : {type: Number, required:true},
    note : {type:String}
});

module.exports = mongoose.model('Transaction', TransactionSchema);
