import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountsService {

    constructor(private http: Http) { }

    // Get all posts from the API
    getAllAccounts() {
        return this.http.get('/api/users/5845cee512a8762e2c845b61/accounts')
            .map(res => res.json());
    }
}