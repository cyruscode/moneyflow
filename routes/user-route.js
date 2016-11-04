"use strict";

let express = require('express');
let User = require('../models/user.js');
let UserMapper = require("../mappers/user-mapper.js");
let UserService = require("../services/user-service.js");

let router = express.Router();

var userMapper = new UserMapper();
var userService = new UserService({_user: User});

router.route('/')
    .post(function (req, res) {

        let user = userMapper.requestToUser(req);

        userService.saveUser(user)
            .then(function (user) {
                return res.json(user);
            })
            .catch(function (err) {
                return res.send(err);
            });
    })

    .get(function (req, res) {
        userService.getUsers()
            .then(function (users) {
                return res.json(users);
            })
            .catch(function (err) {
                return res.send(err);
            });
    });

router.route("/:id")
    .get(function (req, res) {

        userService.getUser(req.params.id)
            .then(function (user) {
                return res.json(user);
            })
            .catch(function (err) {
                return res.send(err);
            });
    })

    .put(function (req, res) {
        userService.getUser(req.params.id)
            .then(function (user) {

                let mappedUser = userMapper.requestToExistingUser(req, user);

                userService.saveUser(mappedUser)
                    .then(function (newUser) {
                        return res.json(newUser);
                    })
                    .catch(function (err) {
                        return res.send(err);
                    });
            })
            .catch(function (err) {
                return res.send(err);
            });
    })

    .delete(function (req, res) {
        userService.deleteUser(req.params.id)
            .then(function (success) {
                return res.json({message: 'Successfully deleted'});
            })
            .catch(function (err) {
                return res.send(err);
            });
    });


module.exports = router;
