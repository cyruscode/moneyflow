"use strict";

let express = require('express');
const validate = require('express-jsonschema').validate;

const transactionService = require('../services/transaction-service');
const transactionMapper = require('../mappers/transaction-mapper');
const responseMapper = require('../mappers/response-mapper');
const transactionSchema = require('../schema/transactionSchema');

let router = express.Router();

router.route("/:userId/accounts/:accountId/transactions", validate({body: transactionSchema}))

  .post((req, res) => {
    let {userId, accountId} = req.params;
    let transaction = transactionMapper.requestToTransaction(req.body);

    transactionService.create(userId, accountId, transaction)
      .then(newTransaction => {
        return transactionMapper.map(newTransaction);
      })
      .then(mappedTransaction => {
        res.location('api/users/{{userId}}/accounts/{{accountId}}/transactions/{{mappedTransaction.id}}');
        res.status(201).json(responseMapper.map(201, mappedTransaction));
      })
      .catch(err => {
        res.status(500).send(err);
      });
  })

  .get((req, res) => {
    let {accountId} = req.params;
    let {page, limit} = req.query;
    transactionService.getTransactions(accountId, page, limit)
      .then(transactions => {
        return transactions.map((transaction) => transactionMapper.map(transaction));
      })
      .then(mappedTransactions => {
        res.status(200).json(responseMapper.map(200, mappedTransactions));
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });


router.route("/:userId/accounts/:accountId/transactions/:transactionId", validate({body: transactionSchema}))
  .get((req, res) => {
    let {transactionId} = req.params;

    transactionService.getTransaction(transactionId)
      .then(transaction => {
        return transactionMapper.map(transaction);
      })
      .then(mappedTransaction => {
        res.json(responseMapper.map(200, mappedTransaction));
      })
      .catch(err => {
        res.send(err);
      });
  })

  .put((req, res) => {
    let transaction = req.body;
    let {transactionId} = req.params;
    transaction._id = transactionId;
    let newTransaction = transactionMapper.requestToTransaction(transaction);

    transactionService.update(newTransaction)
      .then(newTransaction => {
        return transactionMapper.map(newTransaction);
      })
      .then(mappedTransaction => {
        res.json(responseMapper.map(200, mappedTransaction));
      })
      .catch(err => {
        res.send(err);
      });
  })

  .delete((req, res) => {
    let {userId, accountId, transactionId} = req.params;
    transactionService.delete(userId, accountId, transactionId)
      .then(account => {
        res.json(account);
      })
      .catch(err => {
        res.send(err);
      })
  });

module.exports = router;
