"use strict";	

let express = require('express');

let User = require('../models/user.js');
let Account = require('../models/account.js');

let UserService = require("../services/user-service.js");
let AccountMapper = require("../mappers/account-mapper.js");
let AccountService = require("../services/account-service.js");

let router = express.Router();

let accountMapper = new AccountMapper();
let userService = new UserService({_user : User});
let accountService = new AccountService({_userService : userService});

router.route("/:userId/accounts")
    .post(function (req, res) {
        let userId = req.params.userId;
        let account = accountMapper.requestToAccount(req);
        accountService.createAccount(userId, account, function (err, newAccount) {

        	if (err) {
        	  return res.send(err);
          }

          return res.json(newAccount);
        });
    })
    
    .get(function (req, res) {
    	 let userId = req.params.userId;
    	 
    	 if (userId == undefined){
    		 res.send("UserId undefined");
    	 }
    	 
    	 accountService.getAccounts(userId, function (err, accounts) {
    	   if (err){
    	     return res.send(err);
    	   }

         return res.json(accounts);
    	 });
    });

router.route("/:userId/accounts/:accountId")
    .get(function (req, res) {
        let userId = req.params.userId;
        let accountId = req.params.accountId;

        accountService.getAccount(userId, accountId, function(err, account){
            if (err){
        		return res.send(err);
        	}
	
	       return res.json(account);
        });
    })
    
    .put(function(req, res){
      let userId = req.params.userId;
      let accountId = req.params.accountId;
      
      var account = accountMapper.requestToAccount(req);
      account._id = accountId;
      accountService.updateAccount(userId, account, function(err, account){
        
        if (err){
          return res.send(err);
        }
        
        return res.json(account);
      });
    })

    .delete(function (req, res) {
      let userId = req.params.userId;
      let accountId = req.params.accountId;
    
      accountService.deleteAccount(userId, accountId, function (err, user) {
        if (err) {
          return res.send(err);
        }

        return res.json(user);
      });
  });

module.exports = router;