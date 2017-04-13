"use strict";

let express = require('express');
const validate = require('express-jsonschema').validate;

const transactionService = require("../services/transaction-service.js");
const transactionMapper = require("../mappers/transaction-mapper.js");
const transactionSchema = require("../schema/transactionSchema");

let router = express.Router();

router.route("/:userId/accounts/:accountId/transactions", validate({body: transactionSchema}))

  .post((req, res) => {
    let {userId, accountId} = req.params;
    let transaction = transactionMapper.requestToTransaction(req.body);

    transactionService.create(userId, accountId, transaction)
      .then((newTransaction) => res.json(transactionMapper.map(newTransaction)))
      .catch((err) => res.send(err));
  })

  .get((req, res) => {
    let {userId, accountId} = req.params;

    transactionService.getTransactions(userId, accountId)
      .then((transactions) => res.json(transactions.map((transaction)=> transactionMapper.map(transaction))))
      .catch((err) => res.send(err));
  });


router.route("/:userId/accounts/:accountId/transactions/:transactionId", validate({body: transactionSchema}))
  .get((req, res) => {
    let {userId, accountId, transactionId} = req.params;

    transactionService.getTransaction(userId, accountId, transactionId)
      .then((transaction) => res.json(transactionMapper.map(transaction)))
      .catch((err) => res.send(err));
  })

  .put((req, res) => {

    let {userId, accountId, transactionId} = req.params;
    let newTransaction = transactionMapper.requestToExistingTransaction(req.body, transactionId);

    transactionService.update(userId, accountId, newTransaction)
      .then((newTransaction) => res.json(transactionMapper.map(newTransaction)))
      .catch((err) => res.send(err));
  })

  .delete((req, res) => {
    let {userId, accountId, transactionId} = req.params;
    transactionService.delete(userId, accountId, transactionId)
      .then((account) => res.json(account))
      .catch((err) => res.send(err));
  });

module.exports = router;
