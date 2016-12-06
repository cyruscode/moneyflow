"use strict";


class ResponseMapper{

  map(code = 200, data){

    return {
      status: code,
      data: data
    };
  }

  mapError(err){
    return {
      status : 500,
      message : err
    };
  }

}

module.exports = new ResponseMapper();