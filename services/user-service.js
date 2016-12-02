"use strict";

const User = require('../models/user.js');
class UserService {

  constructor(options) {
    this.options = options;
  }

  getUsers() {
    return this.options._user.findAsync();
  }

  getUser(userId) {
    return this.options._user.findByIdAsync(userId);
  }

  saveUser(user) {
    return user.saveAsync();
  }

  deleteUser(userId) {
    return this.options._user.removeAsync({_id: userId});
  }
}

module.exports = new UserService({_user: User});
