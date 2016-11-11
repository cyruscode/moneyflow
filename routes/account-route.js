"use strict";

let express = require('express');

let User = require('../models/user.js');

let UserService = require("../services/user-service.js");
let AccountMapper = require("../mappers/account-mapper.js");
let AccountService = require("../services/account-service.js");

let router = express.Router();

let accountMapper = new AccountMapper();
let userService = new UserService({_user : User});
let accountService = new AccountService({_userService : userService,  _user : User});

router.route("/:userId/accounts")
    .post(function (req, res) {
        let userId = req.params.userId;
        let account = accountMapper.requestToAccount(req);

        accountService.createAccount(userId, account)
        .then(function(newAccount){return res.json(newAccount);})
        .catch(function(err){return res.send(err);});
    })

    .get(function (req, res) {
    	 let userId = req.params.userId;

    	 if (userId == undefined){
    		 res.send("UserId undefined");
    	 }
    	 accountService.getAccounts(userId)
       .then(function(accounts){return res.json(accounts);})
       .catch(function(err){return res.send(err);});
    });

router.route("/:userId/accounts/:accountId")
    .get(function (req, res) {
        let userId = req.params.userId;
        let accountId = req.params.accountId;

        accountService.getAccount(userId, accountId)
        .then(function(account){return res.json(account)})
        .catch(function(err){return res.send(err);});
    })

    .put(function(req, res){
      let userId = req.params.userId;
      let accountId = req.params.accountId;

      var account = accountMapper.requestToAccount(req);
      account._id = accountId;
      accountService.updateAccount(userId, account)
      .then(function(account){return res.json(account);})
      .catch(function(err){return res.send(err);});
    })

    .delete(function (req, res) {
      let userId = req.params.userId;
      let accountId = req.params.accountId;

      accountService.deleteAccount(userId, accountId)
      .then(function(user){return res.json(user);})
      .catch(function(err){return res.send(err);});
  });

module.exports = router;
