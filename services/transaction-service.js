"use strict";

var Promise = require('bluebird');

class TransactionService{

	constructor(options){
		this.userService = options._userService;
		this.accountService = options._accountService;
	}

	getTransactions(userId, accountId){
		var me = this;
		return new Promise(function(resolve, reject){
			me.accountService.getAccount(userId, accountId)
			.then(function(account){
				return resolve(account.transactions);
			}).catch(function(err){
				return reject(err);
			});
		});
	}

	getTransaction(userId, accountId, transactionId){

		var me = this;
		return new Promise(function(resolve, reject){
			me.accountService.getAccount(userId, accountId)
			.then(function(account){
				return resolve(account.transactions.id(transactionId));})
			.catch(function(err){return reject(err);});
		});
	}

	create(userId, accountId, transaction){
		var me =this;
		return new Promise(function(resolve, reject){
			me.userService.getUser(userId, function(err, user){

		    	if (err){
		    		reject(err);
		    	}

		    	let account = user.accounts.id(accountId);
		    	account.transactions.push(transaction);

		    	user.save(function(err){
		    		if (err) {
			              reject(err);
			          }

			          return resolve(transaction);
		    	});
			});
		});

	}

	update(userId, accountId, transaction){
		var me =this;

		return new Promise(function(resolve, reject){
			me.userService.getUser(userId, function(err, user){

    		if (err){
  				return reject(err);
	    	}

		    let transactions = user.accounts.id(accountId).transactions;
		    let oldTransaction = transactions.id(transaction._id);
				let index = transactions.indexOf(oldTransaction[0]);
				transactions.splice(index, 1 , transaction);

		    	user.save(function(err){
		    		if (err) {
		    			return reject(err);
			        }
			        return resolve(transaction);
		    	});
			});
		});
	}


	delete(userId, accountId, transactionId){
		var me = this;

		return new Promise(function(resolve, reject){
			 me.userService.getUser(userId, function(err, user){
				 if (err){
					 return reject(err);
		    	}

		    	let account = user.accounts.id(accountId);
		    	account.transactions.id(transactionId).remove();

		        user.save(function (err) {
		        	if (err) {
		        		return reject(err);
		        	}

		        	return resolve(account);
		        });
		    });
		});
	}
}

module.exports = TransactionService;
