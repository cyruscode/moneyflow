"use strict";

const Promise = require('bluebird');

const userService = require("../services/user-service");
const accountService = require("../services/account-service");

class TransactionService {

    constructor(options) {
        this.userService = options._userService;
        this.accountService = options._accountService;
    }

    getTransactions(userId, accountId) {
        var me = this;
        return new Promise(function (resolve, reject) {
            me.accountService.getAccount(userId, accountId)
                .then(function (account) {
                    return resolve(account.transactions);
                }).catch(function (err) {
                return reject(err);
            });
        });
    }

    getTransaction(userId, accountId, transactionId) {

        var me = this;
        return new Promise(function (resolve, reject) {
            me.accountService.getAccount(userId, accountId)
                .then(function (account) {
                    return resolve(account.transactions.id(transactionId));
                })
                .catch(function (err) {
                    return reject(err);
                });
        });
    }

    create(userId, accountId, transaction) {
        var me = this;
        return new Promise(function (resolve, reject) {
            me.userService.getUser(userId)
                .then(function (user) {
                    let account = user.accounts.id(accountId);
                    account.transactions.push(transaction);

                    user.saveAsync()
                        .then(function (user) {
                            return resolve(transaction);
                        }).catch(function (err) {
                        return reject(err)
                    });

                }).catch(function (err) {
                return reject(err);

            });
        });

    }

    update(userId, accountId, transaction) {
        var me = this;

        return new Promise(function (resolve, reject) {
            me.userService.getUser(userId)
                .then(function (user) {
                    let transactions = user.accounts.id(accountId).transactions;
                    let oldTransaction = transactions.id(transaction._id);
                    let index = transactions.indexOf(oldTransaction);
                    transactions.splice(index, 1, transaction);

                    user.saveAsync().then(function (user) {
                        return resolve(transaction);
                    }).catch(function (err) {
                        return reject(err)
                    });


                }).catch(function (err) {
                return reject(err)
            });
        });
    }


    delete(userId, accountId, transactionId) {
        var me = this;

        return new Promise(function (resolve, reject) {
            me.userService.getUser(userId)
                .then(function (user) {

                    let account = user.accounts.id(accountId);
                    account.transactions.id(transactionId).remove();

                    user.saveAsync()
                        .then(function (user) {
                            return resolve(account);
                        }).catch(function (err) {
                        return reject(err);
                    });
                }).catch(function (err) {
                return reject(err);
            });
        });
    }
}

module.exports =  new TransactionService({_userService: userService, _accountService: accountService});;
