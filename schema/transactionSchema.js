"use strict";

var transactionSchema = {
  type: "object",
  properties:{
    date: {
      type: "date-time",
      required: true
    },
    amount:{
      type:"number",
      required: true
    },
    note: {
      type: "string",
      required: false
    }
  }

};

module.exports = transactionSchema;