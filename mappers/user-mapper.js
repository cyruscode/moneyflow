"use strict";

const User = require("../models/user.js");
const accountMapper= require("./account-mapper");

class UserMapper {

  requestToUser({username, password, email}=req) {

    let user = new User();
    user.username = username
    user.password = password;
    user.email = email;
    user.lastLogin = new Date();
    return user;
  }

  map({_id, username, password, email, lastLogin, accounts = [], __v} = user) {
    return {
      id : _id,
      username,
      password,
      email,
      lastLogin,
      accounts: accounts.map((account) => accountMapper.map(account)),
      version : __v};
  }

  requestToExistingUser(req, user) {
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    return user;
  }
}

module.exports = new UserMapper();
