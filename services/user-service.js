"use strict";
const Promise = require('bluebird');

const User = require('../models/user.js');
class UserService {

  constructor(options) {
    this.options = options;
  }

  getUsers() {
    return Promise.resolve(this.options._user.find());
  }

  getUser(userId) {
    return Promise.resolve(this.options._user.findById(userId));
  }

  saveUser(user) {
    return Promise.resolve(user.save());
  }

  deleteUser(userId) {
    return Promise.resolve(this.options._user.remove({_id: userId}));
  }
}

module.exports = new UserService({_user: User});
