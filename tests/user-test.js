'use strict';


// import the moongoose helper utilities
var utils = require('./utils');
var should = require('should');
// import our User mongoose model
var User = require('../models/user');


describe('Users: models', function () {


  describe('#create()', function () {
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
  });


});

