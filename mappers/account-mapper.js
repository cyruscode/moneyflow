"use strict";

var Account = require("../models/account.js");

class AccountMapper{

    requestToAccount(req){
        let account = new Account();
        account.bankName = req.body.bankName;
        account.accountType = req.body.accountType;
        account.initialBalance =req.body.initialBalance;
        account.minimumRequired = req.body.minimumRequired;

        return account;

    }
}

module.exports = AccountMapper;