"use strict";

class AccountService {

	constructor(options){
		this.userService = options._userService;
	}
	
	getAccounts(userId, callback){
		
		this.userService.getUser(userId, function(err, user){
			
			if (err){
				callback(err);
			}
			
			return callback(null, user.accounts);
		});
	}
	
	getAccount(userId, accountId, callback){
		
		this.getAccounts(userId, function(err, accounts){
			
			if (err){
				return callback(err);
			}
			
			let account = accounts.id(accountId);

			return callback(null, account);
		})
	}
	
	createAccount(userId, newAccount, callback){

		this.userService.getUser(userId, function(err, user){
			if (err){
				return callback(err);
			}
			
			user.accounts.push(newAccount);
			
			user.save(function(err, user){
				  
				if (err){
					return callback(err);
				}
				
				return callback(null, newAccount);
			});
		});
	}
	
	updateAccount(userId, newAccount, callback){
		this.userService.getUser(userId, function(err, user){
			if (err){
				return callback(err);
			}
			
			var oldAccount = user.accounts.id(newAccount._id);
			let index = user.accounts.indexOf(oldAccount[0]);
			user.accounts.splice(index, 1 , newAccount);
			
			user.save(function(err, user){
			  
				if (err){
					return callback(err);
				}
				
				return callback(null, newAccount);
			});
		});
	}
	
	deleteAccount(userId, accountId, callback){
    
	    this.userService.getUser(userId, function(err, user){
	      
	      if (err){
	        return callback(err);
	      }
	      
	      user.accounts.id(accountId).remove();
	      
	      user.save(function (err) {
	        if (err) {
	            return callback(err);
	        }
	
	        return callback(null, user);
	      });
	    });
	}
}


module.exports = AccountService;