"use strict";
const Promise = require('bluebird');

const userService = require("../services/user-service.js");


class AccountService {

  constructor(options) {
    this._userService = options._userService;
  }

  getAccounts(userId) {
    return Promise.resolve(this._userService.getUser(userId))
      .then((user) => {
        return user.accounts;
      });
  }

  getAccount(userId, accountId) {
    return Promise.resolve(
      this.getAccounts(userId).then((accounts) => {
        return accounts.id(accountId);
      }));
  }

  createAccount(userId, newAccount) {
    return Promise.resolve(
      this._userService.getUser(userId)
        .then((user) => {
            user.accounts.push(newAccount);
            return user.save()
              .then(() => {
                  return newAccount;
                }
              )
          }
        ));
  }

  updateAccount(userId, newAccount) {

    return Promise.resolve(
      this._userService.getUser(userId)
        .then((user) => {

          let oldAccount = user.accounts.id(newAccount._id);
          let index = user.accounts.indexOf(oldAccount);

          if (!oldAccount) {
            throw new Error("account not found");
          }
          user.accounts.splice(index, 1, newAccount);

          return user.save()
            .then(() => {
              return newAccount;
            });
        }));
  }

  deleteAccount(userId, accountId) {
    return Promise.resolve(
      this._userService.getUser(userId)
        .then((user) => {
          user.accounts.id(accountId).remove();

          return user.save()
            .then((user) => {
              return user
            });
        })
    );
  }
}


module
  .exports = new AccountService({_userService: userService});
