"use strict";

const User = require('../models/user.js');
class UserService {

  constructor(options) {
    this.options = options;
  }

  getUsers(wTransactions =false, pageNumber = 0, pageSize = 10) {
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
      let query = this.options._user.findOne({_id: userId});

      if (wTransactions === true) {
        query.populate('accounts.transactions');
      }

     return query.exec();
  }


  saveUser(user) {
    return user.save();
  }

  deleteUser(userId) {
    return this.options._user.remove({_id: userId});
  }
}

module.exports = new UserService({_user: User});
