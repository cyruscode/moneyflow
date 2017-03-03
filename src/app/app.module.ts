import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsService } from './accounts.service';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    TransactionsComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'accounts',
        component: AccountsComponent
      },
      {
        path: "transactions",
        component: TransactionsComponent
      }
    ])
  ],
  providers: [AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
