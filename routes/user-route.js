"use strict";

const express = require('express');
const validate = require('express-jsonschema').validate;

const userSchema = require('../schema/userSchema');
const userService = require("../services/user-service");
const userMapper = require("../mappers/user-mapper");
const responseMapper = require('../mappers/response-mapper');

let router = express.Router();

router.route('', validate({body: userSchema}))
  .post((req, res) => {
    let user = userMapper.requestToUser(req.body);

    userService.saveUser(user)
      .then(newUser => {

        let mappedUser = userMapper.map(newUser);
        res.location(`/api/users/${mappedUser.id}`)
        res.json(201, responseMapper.map(201, mappedUser));
      })
      .catch(err => {
        res.send(err);
      });
  })

  .get((req, res) => {
    let {transactions, page, limit} = req.query;

    return userService.getUsers(transactions, page, limit)
      .then(users => {
        return users.map(user => userMapper.map(user));
      }).then(mappedUsers => {
        res.json(responseMapper.map(200, mappedUsers));
      })
      .catch(err => {
        res.send(err);
      });
  });

router.route("/:id", validate({body: userSchema}))
  .get((req, res) => {
    let {transactions} = req.query;

    return userService.getUser(req.params.id, transactions)
      .then(user => {
        return userMapper.map(user);
      })
      .then(mappedUser => {
        res.json(responseMapper.map(200, mappedUser));
      })
      .catch(err => {
        res.send(err);
      });
  })

  .put((req, res) => {
    userService.getUser(req.params.id)
      .then(user => {
        userMapper.requestToExistingUser(req, user);
      })
      .then(mappedUser => {
        userService.saveUser(mappedUser)
          .then(savedUser => {
            return userMapper.map(savedUser);
          })
          .then(mappedUser => {
            res.json(responseMapper.map(200, mappedUser));
          });
      })
      .catch(err => {
        res.send(err);
      });
  })

  .delete((req, res) => {
    userService.deleteUser(req.params.id)
      .then(() => {
        res.json({message: 'Successfully deleted'});
      })
      .catch(err => {
        res.send(err);
      });
  });


module.exports = router;
