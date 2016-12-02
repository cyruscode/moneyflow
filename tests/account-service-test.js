"use strict";

var utils = require('./utils');
var should = require('should');

var User = require('./../models/user');
var Account = require('./../models/account');
var UserService = require('./../services/user-service');
var AccountService = require('./../services/account-service');


describe('AccountService', function () {

  var userService = new UserService({_user: User});
  var accountService = new AccountService({_userService: userService});

  it('should create the account for the user', function (done) {

    var u = new User();
    u.username = 'someUser';
    u.password = 'toto';
    u.email = 'email@gmail.com';

    userService.saveUser(u).then(function (user) {

      var account = {
        bankName: 'Desjardins',
        accountType: 'Chequing',
        initialBalance: 0,
        minimumRequired: 5000
      };

      accountService.createAccount(user._id, account)
        .then(function (savedAccount) {
          !should.equal(savedAccount._id, null);
          savedAccount.bankName.should.equal('Desjardins');
          savedAccount.accountType.should.equal('Chequing');
          savedAccount.initialBalance.should.equal(0);
          savedAccount.minimumRequired.should.equal(5000);
          done();
        });
    });
  });

  it('should update the account for the user', function (done) {
    var u = new User();
    u.username = 'someUser';
    u.password = 'toto';
    u.email = 'email@gmail.com';

    userService.saveUser(u).then(function (user) {

      var account = new Account();
      account.bankName = 'Desjardins';
      account.accountType = 'Chequing';
      account.initialBalance = 0;
      account.minimumRequired = 5000;

      accountService.createAccount(user._id, account)
        .then(function (savedAccount) {
          savedAccount.accountType = 'Savings';

          accountService.updateAccount(user._id, savedAccount)
            .then(function (updatedAccount) {

              updatedAccount.accountType.should.equal('Savings');
              done();
            }).catch(function (err) {
            should.not.exist(err);
          });
        }).catch(function (err) {
        should.not.exist(err);
      });
    });

  });
})
;