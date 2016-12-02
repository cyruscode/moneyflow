"use strict";
const transactionSchema = require('./transactionSchema');

var accountSchema = {
  type:"object",
  properties:{
    bankName : {
      type : "string",
      required : "true",
    },
    accountType : {
      type: "string",
      required : "true",
      enum: ["Chequing", "Savings", "RSVP", "TFSA"]
    },
    initialBalance:{
      type:"number",
      required: true
    },
    minimumRequired:{
      type: "number",
      required: true
    },
    transactions: {
      type: "array",
      items: transactionSchema
    }
  }
};

module.exports = accountSchema;