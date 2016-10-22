"use strict";

var Transaction = require("../models/transaction.js");
class TransactionMapper{

    requestToTransaction(req){
        let transaction = new Transaction();
        transaction.date = req.body.date;
        transaction.amount = req.body.amount;
        transaction.note = req.body.note;
        return transaction;
    }

    requestToExistingTransaction(req, transactionId){
        let transaction = new Transaction();

    	transaction._id = transactionId;
    	transaction.date = req.body.date;
        transaction.amount = req.body.amount;
        transaction.note = req.body.note;
        return transaction;
    }

}

module.exports = TransactionMapper;