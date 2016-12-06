"use strict";

const User = require('../models/user.js');
class UserService {

  constructor(options) {
    this.options = options;
  }

  getUsers(pageNumber = 0, pageSize = 1) {
    var me = this;
    return new Promise(function (resolve, reject) {
      me.options._user
        .find({})
        .skip(pageNumber * pageSize)
        .limit(parseInt(pageSize))
        .sort('_id')
        .exec(function (err, users) {

          if (err) {
            return reject(err);
          }

          return resolve(users);
        });
    });
  }

  getUser(userId, wTransactions) {
    var me = this;
    return new Promise(function (resolve, reject) {
      let query = me.options._user.findOne({_id: userId});
      if (wTransactions === 'true') {
        query.populate('accounts.transactions');
      }

      query.exec(function (err, user) {
        if (err) {
          return reject(err);
        }

        return resolve(user);
      });
    });
  }


  saveUser(user) {
    return user.saveAsync();
  }

  deleteUser(userId) {
    return this.options._user.removeAsync({_id: userId});
  }
}

module.exports = new UserService({_user: User});
