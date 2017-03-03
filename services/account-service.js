"use strict";
var Promise = require('bluebird');

const User = require('../models/user');
const userService = require("../services/user-service");
const transactionService = require('../services/transaction-service');

class AccountService {

  constructor(options) {
    this._user = options._user;
    this.transactionService = options._transactionService;
    this.userService = options._userService;
  }

  getAccounts(userId, wTransactions = false) {
    return this.userService.getUser(userId, wTransactions)
      .then(user => {
        return user.accounts;
      });
  }

  getAccount(userId, accountId, wTransactions = true) {
    return this.getAccounts(userId, wTransactions)
      .then(accounts => {
        return accounts.id(accountId);
      });
  }

  createAccount(userId, newAccount) {
    return this.userService.getUser(userId)
      .then(user => {
        user.accounts.push(newAccount);

        return user.save()
          .then(() => {
            return Promise.resolve(newAccount);
          });
      });
  }

  updateAccount(userId, newAccount) {
    return this.userService.getUser(userId)
      .then(user => {

        let oldAccount = user.accounts.id(newAccount._id);
        let index = user.accounts.indexOf(oldAccount);

        if (index < 0) {
          return Promise.reject("account not found");
        }
        user.accounts.splice(index, 1, newAccount);

        return user.save()
          .then(() => {
            return Promise.resolve(newAccount);
          });
      });
  }

  deleteAccount(userId, accountId) {
    return this.userService.getUser(userId)
      .then(user => {

        user.accounts.id(accountId).remove();

        return user.save()
          .then(user => {
            return Promise.resolve(user)
          });
      });
  }
}


module.exports = new AccountService({
  _user: User,
  _userService: userService,
  _transactionService: transactionService
});
