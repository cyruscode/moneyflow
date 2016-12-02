"use strict";
const accountSchema = require('./accountSchema');

var userSchema = {
  type:"object",
  properties: {
    username:{
      type: "string",
      required : true
    },
    password:{
      type: "string",
      required:true
    },
    email: {
      type : "string",
      required: false
    },
    lastLogin : {
      type: "date-time",
      required: false
    },
    accounts: {
      type: "array",
      required: false,
      items: accountSchema
    }
  }
};

module.exports = userSchema;