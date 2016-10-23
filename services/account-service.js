"use strict";
var Promise = require('bluebird');

class AccountService {

	constructor(options){
		this.userService = options._userService;
	}

	getAccounts(userId){
		var me = this;

		return new Promise(function(resolve, reject){
			me.userService.getUser(userId)
			.then(function(user){return resolve(user.accounts);})
			.catch(function(err){return reject(err);});
		});
	}

	getAccount(userId, accountId){
		var me =this;
		return new Promise(function(resolve, reject){
			me.getAccounts(userId)
			.then(function(accounts){
				return resolve(accounts.id(accountId));
			}).catch(function(err){
				return reject(err);
			});
		});
	}

	createAccount(userId, newAccount){
		var me = this;
		return new Promise(function(resolve, reject){
			me.userService.getUser(userId)
			.then(function(user){
				user.accounts.push(newAccount);

				user.save(function(err, user){
					if (err){
						return reject(err);
					}
					return resolve(newAccount);
				});
			})
			.catch(function(err){return reject(err);});
		});
	}

	updateAccount(userId, newAccount){
		var me = this;

		return new Promise(function(resolve, reject){
			me.userService.getUser(userId)
				.then(function(user){
					let oldAccount = user.accounts.id(newAccount._id);
					let index = user.accounts.indexOf(oldAccount[0]);
					user.accounts.splice(index, 1 , newAccount);

					user.save(function(err, user){
						if (err){
							return reject(err);
						}
						return resolve(newAccount);
				});
			})
			.catch(function(err){return reject(err);});
		});
	}

	deleteAccount(userId, accountId){
    var me = this;
		return new Promise(function(resolve, reject){
			me.userService.getUser(userId)
			.then(function(user){

				user.accounts.id(accountId).remove();

				user.save(function (err) {
					if (err) {
						return reject(err);
					}
					return resolve(user);
				});
			})
			.catch(function(err){return reject (err);});
		});
	}
}


module.exports = AccountService;
