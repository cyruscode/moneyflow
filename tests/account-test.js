'use strict';


// import the moongoose helper utilities
var utils = require('./utils');
var should = require('should');
var User = require('../models/user');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

describe('Accounts: models', function () {

  it('should add account to user', function (done) {

    var u = {
      username: 'someUser',
      password: 'toto',
      email: 'email@gmail.com',
    };
    var account = {
      bankName: 'Desjardins',
      accountType: 'Chequing',
      initialBalance: 0,
      minimumRequired: 5000
    };

    User.create(u, function (err, newUser) {
      should.not.exist(err);

      newUser.accounts.push(account);

      newUser.saveAsync().then(function (savedUser) {

        savedUser.accounts.length.should.equal(1);
        let newAccount = savedUser.accounts[0];
        newAccount.bankName.should.equal('Desjardins');
        newAccount.accountType.should.equal('Chequing');
        newAccount.initialBalance.should.equal(0);
        newAccount.minimumRequired.should.equal(5000);

        done();
      }).catch(function(err){should.not.exist(err);});
    });
  });





});