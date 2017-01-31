"use strict";

const User = require('../models/user.js');
class UserService {

  constructor(options) {
    this.options = options;
  }

  getUsers(wTransactions =false, pageNumber = 0, pageSize = 1) {
    let query = this.options._user
      .find({})
      .skip(pageNumber * pageSize)
      .limit(parseInt(pageSize))
      .sort('_id');

    if (wTransactions ===  'true') {
      query.populate('accounts.transactions');
    }

    return query.exec();
  }

  getUser(userId, wTransactions) {
      let query = this.options._user
        .findOne({_id: userId});

      if (wTransactions === 'true') {
        query.populate('accounts.transactions');
      }

     return query.exec();
  }


  saveUser(user) {
    return user.saveAsync();
  }

  deleteUser(userId) {
    return this.options._user.removeAsync({_id: userId});
  }
}

module.exports = new UserService({_user: User});
