import { Component } from '@angular/core';
import { AccountsComponent } from  './accounts/accounts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}

export class Transaction {
  id: string;
  amount: number;
  date: number;
  note: string;
}

export class Account {
  id: string;
  brankName: string;
  accountType: string;
  initialBalance: number;
  minimumRequired: number;
  transactions: Array<Transaction>;

}