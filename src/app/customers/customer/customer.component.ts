import { CustomerService } from './../customer-services/customer.service';
import { LoadCustomers } from './../state/customer.action';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as customerActions from '../state/customer.action';
import { Customer } from '../customer.model';
import * as fromCustomer from '../state/customer.reducer';
import { map, takeUntil } from 'rxjs/operators';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit,OnDestroy {

  customers$: Observable<Customer[]>;
  private ngUnsubscribe = new Subject();

  constructor(
    private store:Store<fromCustomer.AppState>,
    private customerService:CustomerService
    ) { }


  ngOnInit(): void {

    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$=this.store.pipe(select(fromCustomer.getCustomers));
    console.log(this.customers$);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
