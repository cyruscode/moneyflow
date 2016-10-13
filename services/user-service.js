"use strict";

class UserService {

	constructor(options){
		this.options = options;
	}
	
	
    getUsers(callback) {
    	
        this.options._user.find(function (err, users) {
            if (err) {
                return callback(err);
            }

            return callback(null, users);
        });
    }

    getUser(userId, callback) {

        this.options._user.findById(userId, function (err, user) {
            if (err) {
                return callback(err);
            }

            return callback(null, user);
        });
    }
    
    
    saveUser(user, callback) {

        user.save(function (err) {
            if (err) {
                return callback(err);
            }

            return callback(null, user);
        });
    }

    deleteUser(userId, callback) {
        this.options._user.remove(
            {_id: userId},
            function (err, user) {
                if (err) {
                    return callback(err);
                }

                return callback(null);
            });
    }

}

module.exports = UserService;
