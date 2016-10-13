"use strict";

class AccountService {

	constructor(options){
		this.options = options;
	}
	
	
	getAccounts(userId, callback){
		
		this.options._userService.getUser(userId, function(err, user){
			
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
	
	saveAccount(userId, newAccount, callback){
		var me = this;
		
		this.options._userService.getUser(userId, function(err, user){
			if (err){
				return callback(err);
			}
			
			var oldAccount= user.accounts.filter(function(account){
			  return account._id.equals(newAccount._id);
			});

			console.log(oldAccount);
			
			if (oldAccount.length ==0 ){
			  user.accounts.push(newAccount);
			  console.log("add account");
			}else{
	      let index = user.accounts.indexOf(oldAccount[0]);
			  user.accounts.splice(index, 1 , newAccount);
			  console.log("replace account");
			}
			
			user.save(function(err, user){
			  
				if (err){
					return callback(err);
				}
				
				return callback(null, newAccount);
			})
			
		});
	}
	
  deleteAccount(userId, accountId, callback){
    
    this.options._userService.getUser(userId, function(err, user){
      
      if (err){
        return callback(err);
      }
      
      let account = user.accounts.filter(function (account) {
        return account.id === accountId;
      });
      
      if (account === null){
        return callback("account " + accountId + " not found");
      }
      
      let index = user.accounts.indexOf(account);
      user.accounts.splice(index, 1);
      
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