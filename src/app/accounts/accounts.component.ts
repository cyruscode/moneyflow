import { Component, OnInit } from '@angular/core';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [AccountsService]

})
export class AccountsComponent implements OnInit {
  accounts: any = [];

  constructor(private accountService : AccountsService) {
   }

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe(result => {
      this.accounts = result.data;
    });
  }


}
