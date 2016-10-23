"use strict";

class UserService {

	constructor(options){
		this.options = options;
	}

  getUsers() {
		var me = this;
  	return new Promise(function(resolve, reject){
			me.options._user.find(function (err, users) {
					if (err) {
							return reject(err);
					}
					return resolve(users);
			});
		});
  }

  getUser(userId) {
		var me = this;
		return new Promise(function(resolve, reject){
			me.options._user.findById(userId, function (err, user) {
					if (err) {
							return reject(err);
					}
					return resolve(user);
			});
		});
  }

  saveUser(user) {
		return new Promise(function(resolve, reject){
			user.save(function (err) {
					if (err) {
						return reject(err);
					}
					return resolve(user);
			});
		});
  }

  deleteUser(userId, callback) {
		var me = this;
		return new Promise(function(resolve, reject){
			me.options._user.remove(
					{_id: userId},
					function (err, user) {
						if (err) {
								return reject(err);
						}
						return resolve("success");
					});
			});
  	}
}

module.exports = UserService;
