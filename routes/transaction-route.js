"use strict";

let express = require('express');
const validate = require('express-jsonschema').validate;

const transactionService = require("../services/transaction-service.js");
const transactionMapper = require("../mappers/transaction-mapper.js");
const transactionSchema = require("../schema/transactionSchema");

let router = express.Router();

router.route("/:userId/accounts/:accountId/transactions", validate({body: transactionSchema}))

  .post(function (req, res) {
    let {userId, accountId} = req.params;
    let transaction = transactionMapper.requestToTransaction(req.body);

    transactionService.create(userId, accountId, transaction)
      .then(function (newTransaction) {
        return res.json(transactionMapper.map(newTransaction));
      }).catch(function (err) {
      return res.send(err);
    });
  })

  .get(function (req, res) {
    let {userId, accountId} = req.params;

    transactionService.getTransactions(userId, accountId)
      .then(function (transactions) {
        return res.json(transactions.map((transaction)=> transactionMapper.map(transaction)));
      }).catch(function (err) {
      return res.send(err);
    });
  });


router.route("/:userId/accounts/:accountId/transactions/:transactionId", validate({body: transactionSchema}))
  .get(function (req, res) {
    let {userId, accountId, transactionId} = req.params;

    transactionService.getTransaction(userId, accountId, transactionId)
      .then(function (transaction) {
        return res.json(transactionMapper.map(transaction));
      }).catch(function (err) {
      return res.send(err);
    });
  })

  .put(function (req, res) {

    let {userId, accountId, transactionId} = req.params;
    let newTransaction = transactionMapper.requestToExistingTransaction(req.body, transactionId);

    transactionService.update(userId, accountId, newTransaction)
      .then(function (newTransaction) {
        return res.json(transactionMapper.map(newTransaction));
      }).catch(function (err) {
      return res.send(err);
    });
  })

  .delete(function (req, res) {
    let {userId, accountId, transactionId} = req.params;
    transactionService.delete(userId, accountId, transactionId)
      .then(function (account) {
        return res.json(account);
      }).catch(function (err) {
      return res.send(err);
    })
  });

module.exports = router;
