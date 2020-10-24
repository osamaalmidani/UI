
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Customer } from '../models/customer'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable()

export class RegisterService {

    path = environment.path
    constructor(private _http: HttpClient) { }
    RegisterCustomer(customer: Customer) {
        return this._http.post(this.path + '/addcustomer', customer, { responseType: 'text' });
    }


}