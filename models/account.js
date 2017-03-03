let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let Transaction = require('./transaction');
let Schema = mongoose.Schema;

let AccountSchema = new Schema({
  bankName: {type: String, required: true},
  accountType: {type: String, required: true},
  initialBalance: {type: Number, required: true},
  minimumRequired: {type: Number, required: true},
  transactions: [{type : Schema.Types.ObjectId, ref: 'Transaction'}]
});


module.exports = mongoose.model('Account', AccountSchema);
