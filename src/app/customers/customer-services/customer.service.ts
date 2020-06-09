import { Observable } from 'rxjs';
import { getCustomers } from './../state/customer.reducer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customersrUrl = 'http://localhost:5000/';

  constructor(private http:HttpClient) { }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.customersrUrl);
  }
}
