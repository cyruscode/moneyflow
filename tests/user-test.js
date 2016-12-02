'use strict';


// import the moongoose helper utilities
var utils = require('./utils');
var should = require('should');
var User = require('../models/user');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

describe('Users: models', function () {

    it('should create a new User', function (done) {
      var u = {
        username: 'someUser',
        password: 'toto',
        email: 'email@gmail.com',
      };


      User.create(u, function (err, createdUser) {
        // Confirm that that an error does not exist
        should.not.exist(err);
        // verify that the returned user is what we expect
        createdUser.username.should.equal('someUser');
        createdUser.password.should.equal('toto');
        createdUser.email.should.equal('email@gmail.com');
        // Call done to tell mocha that we are done with this test
        done();
      });
    });

    it('should update an existing user', function (done) {
      var u = {
        username: 'someUser',
        password: 'toto',
        email: 'email@gmail.com',
      };

      User.create(u, function (err, newUser) {
        should.not.exist(err);

        User.findByIdAsync(newUser._id).then(function (user) {

          user.username.should.equal('someUser');
          user.password.should.equal('toto');
          user.email.should.equal('email@gmail.com');

          user.username = 'someUserUpdated';
          user.password = 'passwordUpdated';

          user.saveAsync().then(function (savedUser) {

            savedUser.username.should.equal('someUserUpdated');
            savedUser.password.should.equal('passwordUpdated');
            done();

        });
      });
    });

  });
});