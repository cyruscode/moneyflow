"use strict";

let express = require('express');

let User = require('../models/user.js');
let Account = require('../models/account.js');
let Transaction = require('../models/transaction.js');

let UserService = require("../services/user-service.js");
let AccountService = require("../services/account-service.js");
let TransactionService = require("../services/transaction-service.js");
let TransactionMapper = require("../mappers/transaction-mapper.js");

let userService = new UserService({_user : User});
let accountService = new AccountService({_userService : userService});
let transactionService = new TransactionService({_userService : userService, _accountService : accountService});

let transactionMapper = new TransactionMapper();
let Promise = require('bluebird');
let router = express.Router();

router.route("/:userId/accounts/:accountId/transactions")

	.post(function(req, res){
		let userId = req.params.userId;
		let accountId = req.params.accountId;

		let transaction = transactionMapper.requestToTransaction(req);

		transactionService.create(userId, accountId, transaction)
		.then(function(newTransaction){
			return res.json(newTransaction);
		}).catch(function(err){return res.send(err);});
	})

	.get(function(req, res){
	      let userId = req.params.userId;
	      let accountId = req.params.accountId;

	      transactionService.getTransactions(userId, accountId)
	      .then(function(transactions){
	    	  return res.json(transactions);
	      }).catch(function(err){
	    	  return res.send(err);
	      });
	});


router.route("/:userId/accounts/:accountId/transactions/:transactionId")
	.get(function(req, res){
		let userId = req.params.userId;
		let accountId = req.params.accountId;
		let transactionId = req.params.transactionId;

		transactionService.getTransaction(userId, accountId, transactionId)
			.then(function(transaction){
				return res.json(transaction);
			}).catch(function(err){
				return res.send(err);
			});
	})

	.put(function(req, res){

		  let userId = req.params.userId;
	      let accountId = req.params.accountId;
	      let transactionId = req.params.transactionId;

	      let newTransaction = transactionMapper.requestToExistingTransaction(req, transactionId);

	      transactionService.update(userId, accountId, newTransaction)
	      .then(function(newTransaction){
	    	  return res.json(newTransaction);
	      }).catch(function(err){
	    	  return res.send(err);
	      });
	})

   .delete(function (req, res) {
      let userId = req.params.userId;
      let accountId = req.params.accountId;
      let transactionId = req.params.transactionId;

      transactionService.delete(userId, accountId, transactionId)
      .then(function(account){
    	  return res.json(account);
      }).catch(function(err){
    	  return res.send(err);
      })
  });

module.exports = router;
