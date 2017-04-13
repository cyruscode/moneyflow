"use strict";

let express = require('express');
const validate = require('express-jsonschema').validate;

const accountMapper = require("../mappers/account-mapper.js");
const accountService = require("../services/account-service.js");
const accountSchema = require("../schema/accountSchema");

let router = express.Router();

router.route("/:userId/accounts", validate({body: accountSchema}))
  .post((req, res) => {
    let userId = req.params.userId;
    let account = accountMapper.requestToAccount(req);

    accountService.createAccount(userId, account)
      .then((newAccount) => res.json(accountMapper.map(newAccount)))
      .catch((err) => res.send(err))
  })

  .get((req, res) => {
    let userId = req.params.userId;

    if (userId == undefined) {
      res.send("UserId undefined");
    }
    accountService.getAccounts(userId)
      .then((accounts) => res.json(accounts.map((account) => accountMapper.map(account))))
      .catch((err) => res.send(err));
  });

router.route("/:userId/accounts/:accountId", validate({body: accountSchema}))
  .get((req, res) => {
    let {userId, accountId} = req.params;

    accountService.getAccount(userId, accountId)
      .then((account)  => res.json(accountMapper.map(account)))
      .catch((err)  => res.send(err));
  })

  .put((req, res) => {
    let {userId, accountId} = req.params;

    let account = accountMapper.requestToAccount(req);
    account._id = accountId;
    accountService.updateAccount(userId, account)
      .then((account)  => res.json(accountMapper.map(account)))
      .catch((err) => res.send(err));
  })

  .delete((req, res) => {
    let {userId, accountId} = req.params;

    accountService.deleteAccount(userId, accountId)
      .then((user) => res.json(user))
      .catch((err) => res.send(err));
  });


module.exports = router;
