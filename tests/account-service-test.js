"use strict";

var utils = require('./utils');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');


var User = require('./../models/user');

var UserService = require('./../services/user-service');
var AccountService = require('./../services/account-service');


describe('AccountService', function(){

    var userService = new UserService({_user : User});

    it('should create the account for the user', function(done){
        var accountService = new AccountService({_userService : userService});


        done();

    });
});