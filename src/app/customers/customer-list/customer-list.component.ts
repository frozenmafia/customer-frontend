import { SharedService } from './../shared-services/shared.service';

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { Store, select } from '@ngrx/store';
import { CustomerService } from '../customer-services/customer.service';
import * as fromCustomer from '../state/reducers/customer.reducer';
import * as customerActions from '../state/actions/customer.action';
import { map } from 'rxjs/operators';



  @Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css']
  })
export class CustomerListComponent implements OnInit {

  displayedColumns: string[] = ['_id','_name', '_phone', '_address', '_membership','_edit','_delete'];
  customers$: Observable<Customer[]>;
  l:any;
    edit$: Observable<any>;

  constructor(
    private store:Store<fromCustomer.AppState>,
    private customerService:CustomerService,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$=this.store.pipe(select(fromCustomer.getCustomers));
  }

  editCustomer(customer:Customer){
    console.log(customer);
    console.log(customer._id);
    this.store.dispatch(new customerActions.LoadCustomer(customer._id));
    this.enableEditForm()
  
  }

  deleteCustomer(customer:Customer){
    if(confirm("Are you Sure You want to Delete the User?")){
      this.store.dispatch(new customerActions.DeleteCustomer(customer._id))
    }
  }



  enableEditForm(){

    this.sharedService.sendClickEvent();
      
  }
}
