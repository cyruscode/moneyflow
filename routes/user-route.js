"use strict";	

let express = require('express');
let User = require('../models/user.js');
let UserMapper = require("../mappers/user-mapper.js");
let UserService = require("../services/user-service.js");

let router = express.Router();

let userMapper = new UserMapper();
let userService = new UserService({_user : User});

router.route('/')
	.post(function (req, res) {
	
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

router.route("/:id")
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


module.exports = router;