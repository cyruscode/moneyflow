"use strict";

const express = require('express');
const validate = require('express-jsonschema').validate;

const userSchema = require('../schema/userSchema');
const userMapper = require("../mappers/user-mapper");
const userService = require("../services/user-service");

let router = express.Router();

router.route('', validate({body: userSchema}))
  .post((req, res) => {

    let user = userMapper.requestToUser(req.body);

    userService.saveUser(user)
      .then((user) => res.json(userMapper.map(user)))
      .catch((err) => res.send(err));
  })

  .get((req, res) => {
    userService.getUsers()
      .then((users) => res.json(users.map((user) => userMapper.map(user))))
      .catch((err) => res.send(err));
  });

router.route("/:id", validate({body: userSchema}))
  .get((req, res) => {

    userService.getUser(req.params.id)
      .then((user) => res.json(userMapper.map(user)))
      .catch((err) => res.send(err));
  })

  .put((req, res) => {
    userService.getUser(req.params.id)
      .then((user) => {

        let mappedUser = userMapper.requestToExistingUser(req, user);
        userService.saveUser(mappedUser)
          .then((newUser) => res.json(userMapper.map(newUser)));
      })
      .catch((err) => res.send(err));
  })

  .delete((req, res) => {
    userService.deleteUser(req.params.id)
      .then(() => res.json({message: 'Successfully deleted'}))
      .catch((err) => res.send(err));
  });


module.exports = router;
