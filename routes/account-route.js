"use strict";

let express = require('express');
const validate = require('express-jsonschema').validate;

const accountMapper = require("../mappers/account-mapper.js");
const accountService = require("../services/account-service.js");
const accountSchema = require("../schema/accountSchema");

const responseMapper = require('../mappers/response-mapper');

let router = express.Router();

router.route("/:userId/accounts", validate({body: accountSchema}))
  .post((req, res) => {
    let userId = req.params.userId;
    let account = accountMapper.requestToAccount(req);

    accountService.createAccount(userId, account)
      .then(newAccount => {
        return accountMapper.map(newAccount);
      })
      .then(mappedAccount => {
        res.location('/users/'+userId + '/account/'+  mappedAccount.id);
        res.status(201).json(responseMapper.map(201,mappedAccount));
      })
      .catch(err => {
        res.send(err);
      });
  })

  .get((req, res) => {
    let userId = req.params.userId;
    let {wTransactions} = req.query;

    if (userId == undefined) {
      res.send("UserId undefined");
    }
    return accountService.getAccounts(userId, wTransactions)
      .then(accounts => {
        return accounts.map(account => accountMapper.map(account));
      })
      .then(mappedAccounts => {
        res.json(responseMapper.map(200, mappedAccounts));
      })
      .catch(err => {
        res.send(err);
      });
  });

router.route("/:userId/accounts/:accountId", validate({body: accountSchema}))
  .get((req, res) => {
    let {userId, accountId} = req.params;
    let  {wTransactions} = req.query;
    accountService.getAccount(userId, accountId, wTransactions)
      .then(account => {
        return accountMapper.map(account);
      })
      .then(mappedAccount => {
        return res.json(responseMapper.map(200, mappedAccount));
      })
      .catch(err => {
        return res.send(err);
      });
  })

  .put((req, res) => {
    let {userId, accountId} = req.params;

    var account = accountMapper.requestToAccount(req);
    account._id = accountId;
    accountService.updateAccount(userId, account)
      .then(account => {
        return accountMapper.map(account);
      }).then(mappedAccount => {
        res.json(responseMapper.map(200, mappedAccount));
      })
      .catch(err => {
        return res.send(err);
      });
  })

  .delete((req, res) => {
    let {userId, accountId} = req.params;

    accountService.deleteAccount(userId, accountId)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.send(err);
      });
  });


module.exports = router;
