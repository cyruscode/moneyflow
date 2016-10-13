"use strict";


// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var User = require('./models/user.js');
var Account = require('./models/account.js');
var Transaction = require('./models/transaction.js');

var UserMapper = require("./user-mapper.js");
var AccountMapper = require("./account-mapper.js");
var accountMapper = new AccountMapper();

var UserService = require("./services/user-service.js");
var userService = new UserService({_user : User});

var AccountService = require("./services/account-service.js");
var accountService = new AccountService({_userService : userService});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/moneyflow'); // connect to our
															// database


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express
											// Router

// test route to make sure everything is working (accessed at GET
// http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

router.route('/users')

    .post(function (req, res) {

        let userMapper = new UserMapper();

        let user = userMapper.requestToUser(req);

        userService.saveUser(user, function (err) {
            if (err) {
                res.send(err);
            }

            res.json(user);
        });
    })

    .get(function (req, res) {
        userService.getUsers(function (err, users) {
            if (err){
                res.send(err);
            }

            res.json(users);
        });
    });

router.route("/users/:id")
    .get(function (req, res) {

        userService.getUser(req.params.id, function (err, user) {
            if (err) {
                return res.send(err);
            }

            return res.json(user);
        });
    })

    .put(function (req, res) {
        userService.getUser(req.params.id, function (err, user) {

            if (err) {
                return res.send(err);
            }
            let userMapper = new UserMapper();
            let mappedUser = userMapper.requestToExistingUser(req, user);

            userService.saveUser(mappedUser, function (err) {
                if (err) {
                    return res.send(err);
                }

                return res.json(user);
            });
        })
    })

    .delete(function (req, res) {
        userService.deleteUser(req.params.id, function (err, user) {
            if (err) {
                return res.send(err);
            }

            return res.json({message: 'Successfully deleted'});
        });
    });


router.route("/users/:id/accounts")
    .post(function (req, res) {
        let userId = req.params.id;
        let account = accountMapper.requestToAccount(req);
        accountService.saveAccount(userId, account, function (err, account) {

        	if (err) {
        	  return res.send(err);
          }

          return res.json(account);
        });
    })
    
    .get(function (req, res) {
    	 let userId = req.params.id;
    	
    	 accountService.getAccounts(userId, function (err, accounts) {
    	   if (err){
    	     return res.send(err);
    	   }

         return res.json(accounts);
    	 });
    });

router.route("/users/:id/accounts/:accountId")
    .get(function (req, res) {
        let userId = req.params.id;
        let accountId = req.params.accountId;

        accountService.getAccount(userId, accountId, function(err, account){
            if (err){
        		return res.send(err);
        	}
	
	       return res.json(account);
        });
    })
    
    .put(function(req, res){
      let userId = req.params.id;
      let accountId = req.params.accountId;
      
      var account = accountMapper.requestToAccount(req);
      account._id = accountId;
      accountService.saveAccount(userId, account, function(err, account){
        
        if (err){
          return res.send(err);
        }
        
        return res.json(account);
      });
    })

    .delete(function (req, res) {
      let userId = req.params.id;
      let accountId = req.params.accountId;
    
      accountService.deleteAccount(userId, accountId, function (err, user) {
        if (err) {
          return res.send(err);
        }

        return res.json(user);
      });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);



