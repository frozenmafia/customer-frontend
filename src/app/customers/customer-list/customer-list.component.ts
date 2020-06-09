import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { Store, select } from '@ngrx/store';
import { CustomerService } from '../customer-services/customer.service';
import * as fromCustomer from '../state/customer.reducer';
import * as customerActions from '../state/customer.action';



const ELEMENT_DATA:
    Customer[]=[];

  @Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
  })
export class CustomerListComponent implements OnInit {

  displayedColumns: string[] = ['id','name', 'phone', 'address', 'membership'];

  dataSource = ELEMENT_DATA;
  customers$: Observable<Customer[]>;
  l:any;

  constructor(
    private store:Store<fromCustomer.AppState>,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$=this.store.pipe(select(fromCustomer.getCustomers));
  }

}
