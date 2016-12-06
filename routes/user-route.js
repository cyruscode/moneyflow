"use strict";

const express = require('express');
const validate = require('express-jsonschema').validate;

const userSchema = require('../schema/userSchema');
const userService = require("../services/user-service");
const userMapper = require("../mappers/user-mapper");
const responseMapper = require('../mappers/response-mapper');

let router = express.Router();

router.route('', validate({body: userSchema}))
  .post(function (req, res) {
    let user = userMapper.requestToUser(req.body);

    userService.saveUser(user)
      .then(function (newUser) {

        let mappedUser = userMapper.map(newUser);
        res.location('/api/users/' + mappedUser.id)
        return res.json(201, responseMapper.map(201, mappedUser));
      })
      .catch(function (err) {


        return res.send(err);
      });
  })

  .get(function (req, res) {
    let {page, limit} = req.query;

    userService.getUsers(page, limit)
      .then(function (users) {
        let mappedUsers = users.map((user)=> userMapper.map(user));
        return res.json(responseMapper.map(200, mappedUsers));
      })
      .catch(function (err) {
        return res.send(err);
      });
  });

router.route("/:id", validate({body: userSchema}))
  .get(function (req, res) {

    userService.getUser(req.params.id)
      .then(function (user) {

        return res.json(responseMapper.map(200, userMapper.map(user)));
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
            return res.json(responseMapper.map(200, userMapper.map(newUser)));
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
