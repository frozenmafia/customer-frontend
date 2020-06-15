import { Observable } from 'rxjs';
import { getCustomers } from '../state/reducers/customer.reducer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from '../customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  /* private customersrUrl = 'http://localhost:5000/'; */
  private customersrUrl = 'https://rocky-depths-52331.herokuapp.com/';

  constructor(
    private http:HttpClient
    ) { }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.customersrUrl.concat('getCustomers'));
  }
  getCustomerById(customerId:string):Observable<Customer>{
    return this.http.get<Customer>(this.customersrUrl.concat('getCustomersById'),
    {
      params:{
        to_edit : customerId
      }
    });
  }
  createCustomer(customer:Customer){
    return this.http.post(this.customersrUrl.concat('create'),
      JSON.stringify(customer))
  }
  updateCustomer(customer:Customer){
    return this.http.patch(this.customersrUrl.concat('update'),
      JSON.stringify(customer))
  }
  deleteCustomer(customerId: string){
    return this.http.delete(this.customersrUrl.concat('delete'),
      {
        params:{
          to_delete : customerId
        }
      })
  }

}
