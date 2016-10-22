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

let router = express.Router();

router.route("/:userId/accounts/:accountId/transactions")

	.post(function(req, res){
		let userId = req.params.userId;
		let accountId = req.params.accountId;
		
		let transaction = transactionMapper.requestToTransaction(req);
		
		transactionService.create(userId, accountId, transaction, function(err, newTransaction){
			
			if (err){
				return res.send(err);
			}
			
			return res.json(newTransaction);
			
		});
	})


	.get(function(req, res){
	      let userId = req.params.userId;
	      let accountId = req.params.accountId;
	      
	      transactionService.getTransactions(userId, accountId, function(err, transactions){
	    	  if (err){
	    		  return res.send(err);
	    	  }
	    	  
	    	  return res.json(transactions);
	      });
	});


router.route("/:userId/accounts/:accountId/transactions/:transactionId")
	.get(function(req, res){
		let userId = req.params.userId;
		let accountId = req.params.accountId;
		let transactionId = req.params.transactionId;
		
		transactionService.getTransaction(userId, accountId, transactionId, function(err, transaction){
			if (err){
				return res.send(err);
			}
			
			return res.json(transaction);
		});
	})
	
	.put(function(req, res){
		
		  let userId = req.params.userId;
	      let accountId = req.params.accountId;
	      let transactionId = req.params.transactionId;
		
	      let newTransaction = transactionMapper.requestToExistingTransaction(req, transactionId);
	      
	      transactionService.update(userId, accountId, newTransaction, function(err, transaction){
	    	  if (err){
	    		  return res.send(err);
	    	  }
	    	  return res.json(transaction);
	      });
	})

   .delete(function (req, res) {
      let userId = req.params.userId;
      let accountId = req.params.accountId;
      let transactionId = req.params.transactionId;
    
      transactionService.delete(userId, accountId, transactionId, function (err, account) {
        if (err) {
          return res.send(err);
        }

        return res.json(account);
      });
  });

module.exports = router;