"use strict";

var Transaction = require("../models/transaction");

class TransactionMapper {

  map({_id, date, amount, note} = input) {
    return {id: _id, date, amount, note};
  }

  requestToTransaction({date, amount, note}=req) {
    let transaction = new Transaction();
    transaction.date = date;
    transaction.amount = amount;
    transaction.note = note;
    return transaction;
  }

  requestToExistingTransaction({date, amount, note} = req, transactionId) {
    let transaction = new Transaction();

    transaction._id = transactionId;
    transaction.date = date;
    transaction.amount = amount;
    transaction.note = note;
    return transaction;
  }

}

module.exports = new TransactionMapper();