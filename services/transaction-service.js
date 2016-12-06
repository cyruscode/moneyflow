"use strict";

const Promise = require('bluebird');

const User = require('../models/user');
const Transaction = require('../models/transaction');
const userService = require("../services/user-service");
const accountService = require("../services/account-service");

const transactionMapper = require('../mappers/transaction-mapper');

class TransactionService {

  constructor(options) {
    this._transaction = options._transaction;
    this.userService = options._userService;
    this.accountService = options._accountService;
  }

  create(userId, accountId, transaction) {
    var me = this;

    return new Promise(function (resolve, reject) {
      me.userService.getUser(userId)
        .then(function (user) {
          let account = user.accounts.id(accountId);

          if (account === undefined) {
            reject('account not found');
          }
          transaction._creator = account._id;

          transaction.save()
            .then(function(savedTransaction){

            account.transactions.push(savedTransaction);
            user.save().catch(function(err){return reject(err);});

            return resolve(savedTransaction);
          }).catch(function(err){return reject(err);});

        }).catch(function (err) {
        return reject(err);
      });
    });

  }

  getTransactions(accountId, pageNumber = 0, pageSize = 10) {
    var me = this;
    return new Promise(function (resolve, reject) {
      me._transaction
        .find({_creator: accountId})
        .skip(pageNumber * pageSize)
        .limit(parseInt(pageSize))
        .exec(function (err, transactions) {

        if (err) {
          return reject(err);
        }

        return resolve(transactions);
      });
    });
  }

  getTransaction(transactionId) {

    var me = this;
    return new Promise(function (resolve, reject) {

      me._transaction
        .findOne({_id: transactionId})
        .exec(function (err, transaction) {

        if (err) {
          return reject(err);
        }

        return resolve(transaction);
      });
    });
  }

  update(transaction) {
    var me= this;
    return new Promise(function (resolve, reject) {
      me._transaction.findById(transaction._id)
        .then(function (originTransaction) {

          let mappedTransaction = transactionMapper.mapExistingTransaction(transaction, originTransaction);

          mappedTransaction.save().then(function (updatedTransaction) {
            return resolve(updatedTransaction);
          });
      }).catch(function(err){reject(err)});
    });
  }

  delete(userId, accountId, transactionId) {
    var me = this;

    return new Promise(function (resolve, reject) {
      me.userService.getUser(userId)
        .then(function (user) {

          let account = user.accounts.id(accountId);
          account.transactions.pull({_id: transactionId});

          user.saveAsync()
            .then(function (user) {

              me._transaction.remove({_id :transactionId})
                .then(function(err){
                  return resolve(account);
              });
            }).catch(function (err) {
            return reject(err);
          });
        }).catch(function (err) {
        return reject(err);
      });
    });
  }
}

module.exports = new TransactionService({
  _user : User,
  _transaction: Transaction,
  _userService: userService,
  _accountService: accountService
});
