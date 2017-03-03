import { Component, OnInit } from '@angular/core';
import {AccountsService} from '../accounts.service';
import {Account} from "../app.component";
import { TransactionsComponent } from '../transactions/transactions.component';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [AccountsService]

})
export class AccountsComponent implements OnInit {
  accounts: any = [];
  selectedAccount: Account;
  constructor(private accountService : AccountsService) {
   }

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe(result => {
      this.accounts = result.data;
    });
  }

  onSelect(account: Account): void {
    this.selectedAccount = account;
  }


}
