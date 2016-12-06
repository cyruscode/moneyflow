"use strict";

let express = require('express');
const validate = require('express-jsonschema').validate;

const transactionService = require('../services/transaction-service');
const transactionMapper = require('../mappers/transaction-mapper');
const responseMapper = require('../mappers/response-mapper');
const transactionSchema = require('../schema/transactionSchema');

let router = express.Router();

router.route("/:userId/accounts/:accountId/transactions", validate({body: transactionSchema}))

  .post(function (req, res) {
    let {userId, accountId} = req.params;
    let transaction = transactionMapper.requestToTransaction(req.body);

    transactionService.create(userId, accountId, transaction)
      .then(function (newTransaction) {
        let mappedTransaction  = transactionMapper.map(newTransaction);
        res.location('api/users/{{userId}}/accounts/{{accountId}}/transactions/{{mappedTransaction.id}}');
        return res.status(201).json(responseMapper.map(201, mappedTransaction));
      }).catch(function (err) {
      return res.status(500).send(err);
    });
  })

  .get(function (req, res) {
    let {accountId} = req.params;
    let {page, limit} = req.query;
    transactionService.getTransactions(accountId, page, limit)
      .then(function (transactions) {
        let mappedTransactions =transactions.map((transaction)=> transactionMapper.map(transaction));
        return res.status(200).json(responseMapper.map(200, mappedTransactions));
      }).catch(function (err) {
      return res.status(500).send(err);
    });
  });


router.route("/:userId/accounts/:accountId/transactions/:transactionId", validate({body: transactionSchema}))
  .get(function (req, res) {
    let {transactionId} = req.params;

    transactionService.getTransaction(transactionId)
      .then(function (transaction) {
        let mappedTransaction= transactionMapper.map(transaction);

        return res.json(responseMapper.map(200, mappedTransaction));
      }).catch(function (err) {
      return res.send(err);
    });
  })

  .put(function (req, res) {
    let transaction = req.body;
    let {transactionId} = req.params;
    transaction._id = transactionId;
    let newTransaction = transactionMapper.requestToTransaction(transaction);

    transactionService.update(newTransaction)
      .then(function (newTransaction) {
        return res.json(responseMapper.map(200,transactionMapper.map(newTransaction)));
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
