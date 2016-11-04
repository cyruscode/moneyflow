var mongoose     = require('mongoose');
var Transaction = require('./transaction.js');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);
var Schema       = mongoose.Schema;

var AccountSchema   = new Schema({
        bankName : {type:String, required :true},
        accountType : {type: String, required:true},
        initialBalance : {type:Number, required:true},
        minimumRequired : {type:Number, required:true},
        transactions : [Transaction.schema]
});

module.exports = mongoose.model('Account', AccountSchema);
