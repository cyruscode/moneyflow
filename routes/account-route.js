"use strict";

let express = require('express');
const validate = require('express-jsonschema').validate;

const accountMapper = require("../mappers/account-mapper.js");
const accountService = require("../services/account-service.js");
const accountSchema = require("../schema/accountSchema");

let router = express.Router();

router.route("/:userId/accounts", validate({body: accountSchema}))
  .post(function (req, res) {
    let userId = req.params.userId;
    let account = accountMapper.requestToAccount(req);

    accountService.createAccount(userId, account)
      .then(function (newAccount) {
        return res.json(accountMapper.map(newAccount));
      })
      .catch(function (err) {
        return res.send(err);
      });
  })

  .get(function (req, res) {
    let userId = req.params.userId;

    if (userId == undefined) {
      res.send("UserId undefined");
    }
    accountService.getAccounts(userId)
      .then(function (accounts) {
        return res.json(accounts.map((account) => accountMapper.map(account)));
      })
      .catch(function (err) {
        return res.send(err);
      });
  });

router.route("/:userId/accounts/:accountId", validate({body: accountSchema}))
  .get(function (req, res) {
    let {userId, accountId} = req.params;

    accountService.getAccount(userId, accountId)
      .then(function (account) {
        return res.json(accountMapper.map(account))
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
        return res.json(accountMapper.map(account));
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
