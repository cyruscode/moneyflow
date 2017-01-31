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
    return this.userService.getUser(userId)
      .then(user => {
        let account = user.accounts.id(accountId);

        if (account === undefined) {
          return Promise.reject('account not found');
        }
        transaction._creator = account._id;

        transaction.save()
          .then(savedTransaction => {

            account.transactions.push(savedTransaction);
            user.save()
              .then(() => {
                return Promise.resolve(savedTransaction);
              });
          });
      });

  }

  getTransactions(accountId, pageNumber = 0, pageSize = 10) {
    return this._transaction
      .find({_creator: accountId})
      .skip(pageNumber * pageSize)
      .limit(parseInt(pageSize))
      .exec();
  }

  getTransaction(transactionId) {
    return this._transaction
      .findOne({_id: transactionId})
      .exec();
  }

  update(transaction) {
    this._transaction.findById(transaction._id)
      .then((originTransaction) => {
        return transactionMapper.mapExistingTransaction(transaction, originTransaction);
      })
      .then(mappedTransaction => {
        return mappedTransaction.save();
      });
  }

  delete(userId, accountId, transactionId) {
    return this.userService.getUser(userId)
      .then(user => {
        let account = user.accounts.id(accountId);
        account.transactions.pull({_id: transactionId});
        user.save()
          .then(() => {
            this._transaction.remove({_id: transactionId})
              .then(() => {
                return Promise.resolve(account);
              });
          });
      });
  }
}

module.exports = new TransactionService({
  _user: User,
  _transaction: Transaction,
  _userService: userService,
  _accountService: accountService
});
