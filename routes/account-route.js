"use strict";

let express = require('express');
const validate = require('express-jsonschema').validate;

const accountMapper = require("../mappers/account-mapper.js");
const accountService = require("../services/account-service.js");
const accountSchema = require("../schema/accountSchema");

const responseMapper = require('../mappers/response-mapper');

let router = express.Router();

router.route("/:userId/accounts", validate({body: accountSchema}))
  .post(function (req, res) {
    let userId = req.params.userId;
    let account = accountMapper.requestToAccount(req);

    accountService.createAccount(userId, account)
      .then(function (newAccount) {
        let mappedAccount = accountMapper.map(newAccount);
        res.location('/users/'+userId + '/account/'+  mappedAccount.id);
        return res.status(201).json(responseMapper.map(201,mappedAccount));
      })
      .catch(function (err) {
        return res.send(err);
      });
  })

  .get(function (req, res) {
    let userId = req.params.userId;
    let {wTransactions} =req.query;

    if (userId == undefined) {
      res.send("UserId undefined");
    }
    accountService.getAccounts(userId, wTransactions)
      .then(function (accounts) {
        let mappedAccounts =accounts.map((account) => accountMapper.map(account));

        return res.json(responseMapper.map(200, mappedAccounts));
      })
      .catch(function (err) {
        return res.send(err);
      });
  });

router.route("/:userId/accounts/:accountId", validate({body: accountSchema}))
  .get(function (req, res) {
    let {userId, accountId} = req.params;
    let  {wTransactions} = req.query;
    accountService.getAccount(userId, accountId, wTransactions)
      .then(function (account) {
        return res.json(responseMapper.map(200, accountMapper.map(account)));
      })
      .catch(function (err) {
        return res.send(err);
      });
  })

  .put(function (req, res) {
    let {userId, accountId} = req.params;

    var account = accountMapper.requestToAccount(req);
    account._id = accountId;
    accountService.updateAccount(userId, account)
      .then(function (account) {
        return res.json(responseMapper.map(200,accountMapper.map(account)));
      })
      .catch(function (err) {
        return res.send(err);
      });
  })

  .delete(function (req, res) {
    let {userId, accountId} = req.params;

    accountService.deleteAccount(userId, accountId)
      .then(function (user) {
        return res.json(user);
      })
      .catch(function (err) {
        return res.send(err);
      });
  });


module.exports = router;
