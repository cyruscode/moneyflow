"use strict";

let Transaction = require("../models/transaction");

class TransactionMapper {

  map({_id, date, amount, note,__v} = transaction) {
    return {id: _id, date, amount, note, version: __v};
  }

  //used for creation
  requestToTransaction({date, amount, note}=req) {
    let transaction = new Transaction();
    transaction.date = date;
    transaction.amount = amount;
    transaction.note = note;
    return transaction;
  }

  requestToExistingTransaction({date, amount, note} = input, transactionId) {
    let transaction = new Transaction();

    transaction._id = transactionId;
    transaction.date = date;
    transaction.amount = amount;
    transaction.note = note;
    return transaction;
  }

  mapExistingTransaction(newTransaction, originTransaction) {

    originTransaction.date = newTransaction.date;
    originTransaction.amount = newTransaction.amount;
    originTransaction.note = newTransaction.note;
    return originTransaction;
  }
}

module.exports = new TransactionMapper();