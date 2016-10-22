"use strict";

class TransactionService{
	
	constructor(options){
		this.userService = options._userService;
		this.accountService = options._accountService;
	}
	
	getTransactions(userId, accountId, callback){
		
		this.accountService.getAccount(userId, accountId, function(err, account){
			
			if (err){
				return callback(err);
			}
			
			
			return callback(null, account.transactions);
		});
	}
	
	getTransaction(userId, accountId, transactionId, callback){
		
		this.accountService.getAccount(userId, accountId, function(err, account){
			
			if (err){
				return callback(err);
			}
			
			return callback(null, account.transactions.id(transactionId));
		});
	}
	
	create(userId, accountId, transaction, callback){
		
		this.userService.getUser(userId, function(err, user){

	    	if (err){
	    		return callback(err);
	    	}
	    		    	
	    	let account = user.accounts.id(accountId);
	    	account.transactions.push(transaction);
	    	
	    	user.save(function(err){
	    		if (err) {
		              return callback(err);
		          }

		          return callback(null, transaction);
	    	});
	    	
		});
	}
	
	update(userId, accountId, transaction, callback){
		
		this.userService.getUser(userId, function(err, user){

	    	if (err){
	    		return callback(err);
	    	}
	    	
	    	let transactions = user.accounts.id(accountId).transactions;
	    	let oldTransaction = transactions.id(transaction._id);
			let index = transactions.indexOf(oldTransaction[0]);
			transactions.splice(index, 1 , transaction);
			
	    	user.save(function(err){
	    		if (err) {
	    			return callback(err);
		        }

		        return callback(null, transaction);
	    	});
		});
	}
	
	
	delete(userId, accountId, transactionId, callback){
		
	    this.userService.getUser(userId, function(err, user){

	    	if (err){
	    		return callback(err);
	    	}
	    	
	    	let account = user.accounts.id(accountId);
	    	account.transactions.id(transactionId).remove();
	        
	        user.save(function (err) {
	          if (err) {
	              return callback(err);
	          }

	          return callback(null, account);
	        });
	        
	    });
	}
	
	
}

module.exports = TransactionService;