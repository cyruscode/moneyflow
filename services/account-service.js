"use strict";
var Promise = require('bluebird');

const userService = require("../services/user-service.js");


class AccountService {

    constructor(options) {
        this.userService = options._userService;
    }

    getAccounts(userId) {
        var me = this;

        return new Promise(function (resolve, reject) {
            me.userService.getUser(userId)
                .then(function (user) {
                    return resolve(user.accounts);
                })
                .catch(function (err) {
                    return reject(err);
                });
        });
    }

    getAccount(userId, accountId) {
        var me = this;
        return new Promise(function (resolve, reject) {
            me.getAccounts(userId)
                .then(function (accounts) {
                    return resolve(accounts.id(accountId));
                }).catch(function (err) {
                return reject(err);
            });
        });
    }

    createAccount(userId, newAccount) {
        var me = this;
        return new Promise(function (resolve, reject) {
            me.userService.getUser(userId)
                .then(function (user) {
                    user.accounts.push(newAccount);

                    user.saveAsync()
                        .then(function (user) {
                            return resolve(newAccount)
                        }).catch(function (err) {
                        return reject(err)
                    });
                })
                .catch(function (err) {
                    return reject(err);
                });
        });
    }

    updateAccount(userId, newAccount) {
        var me = this;

        return new Promise(function (resolve, reject) {
            me.userService.getUser(userId)
                .then(function (user) {

                    let oldAccount = user.accounts.id(newAccount._id);
                    let index = user.accounts.indexOf(oldAccount);

                    if (index < 0) {
                        return reject("account not found");
                    }
                    user.accounts.splice(index, 1, newAccount);

                    user.saveAsync()
                        .then(function (user) {
                            return resolve(newAccount)
                        }).catch(function (err) {
                        return reject(err)
                    });
                })
                .catch(function (err) {
                    return reject(err);
                });
        });
    }

    deleteAccount(userId, accountId) {
        var me = this;
        return new Promise(function (resolve, reject) {
            me.userService.getUser(userId)
                .then(function (user) {

                    user.accounts.id(accountId).remove();

                    user.saveAsync()
                        .then(function (user) {
                            return resolve(user)
                        }).catch(function (err) {
                        return reject(err)
                    });
                })
                .catch(function (err) {
                    return reject(err);
                });
        });
    }
}


module.exports = new AccountService({_userService: userService});
