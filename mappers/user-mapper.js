"use strict";

var User = require("../models/user.js");
class UserMapper{

    requestToUser(req){

        let user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.lastLogin = new Date();

        return user;
    }

    requestToExistingUser(req, user){

        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        return user;
    }

}

module.exports = UserMapper;
