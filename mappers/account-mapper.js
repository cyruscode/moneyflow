"use strict";

const Account = require("../models/account");
const transactionMapper = require("./transaction-mapper");

class AccountMapper {

  requestToAccount(req) {
    let account = new Account();
    account.bankName = req.body.bankName;
    account.accountType = req.body.accountType;
    account.initialBalance = req.body.initialBalance;
    account.minimumRequired = req.body.minimumRequired;

    return account;
  }

  map({_id, bankName, accountType, initialBalance, minimumRequired, transactions= [], __v} = account) {
    return {
      id : _id,
      bankName,
      accountType,
      initialBalance,
      minimumRequired,
      transactions : transactions.map(transaction => transactionMapper.map(transaction)),
      version : __v};
  }
}

module.exports = new AccountMapper();