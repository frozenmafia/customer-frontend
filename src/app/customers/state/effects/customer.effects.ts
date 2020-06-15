import { LoadCustomers } from '../actions/customer.action';
import { getCustomers } from '../reducers/customer.reducer';
import { Action } from '@ngrx/store';
import { Observable,of } from 'rxjs';
import { map,mergeMap,catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { CustomerService } from '../../customer-services/customer.service';
import * as customerActions from '../actions/customer.action';
import { Customer } from '../../customer.model';

@Injectable()
export class CustomerEffects{

    constructor(
        private action$:Actions,
        private customerService:CustomerService
    ){}

    @Effect()
    loadcustomers$:Observable<Action> = this.action$.pipe(
        ofType<customerActions.LoadCustomers>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMERS
        ),
        mergeMap((actions:customerActions.LoadCustomers) =>
        this.customerService.getCustomers().pipe(
            map(
                (customers:Customer[])=>
                new customerActions.LoadCustomersSuccess(customers)
            ),
            catchError(err => of(new customerActions.LoadCustomerFail(err)))
        ))

    );


    @Effect()
    loadcustomer$:Observable<Action> = this.action$.pipe(
        ofType<customerActions.LoadCustomer>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMER
        ),
        mergeMap((action:customerActions.LoadCustomer) =>
        this.customerService.getCustomerById(action.payload).pipe(
            map(
                (customer:Customer)=>
                new customerActions.LoadCustomerSuccess(customer)
            ),
            catchError(err => of(new customerActions.LoadCustomerFail(err)))
        ))

    );
    
    @Effect()
    createCustomer$:Observable<Action> = this.action$.pipe(
        ofType<customerActions.CreateCustomer>(
            customerActions.CustomerActionTypes.CREATE_CUSTOMER
        ),
        map((action:customerActions.CreateCustomer) => action.payload),
        mergeMap((customer:Customer)=>
            this.customerService.createCustomer(customer).pipe(
                map(
                    (newCustomer:Customer) =>
                        new customerActions.CreateCustomerSuccess(newCustomer)  
                  ),
                catchError(err => of(new customerActions.LoadCustomerFail(err)))

            )
        )
    );

    @Effect()
    updateCustomer$:Observable<Action> = this.action$.pipe(
        ofType<customerActions.UpdateCustomer>(
            customerActions.CustomerActionTypes.UPDATE_CUSTOMER
        ),
        map((action:customerActions.UpdateCustomer) => action.payload),
        mergeMap((customer:Customer) =>
            this.customerService.updateCustomer(customer).pipe(
                map(
                    (updateCustomer:Customer)=>
                    new customerActions.UpdateCustomerSuccess({
                        id:updateCustomer._id,
                        changes:updateCustomer
                    })
                ),
                catchError(err=>of(new customerActions.UpdateCustomerFail(err)))
            )

        )

    );

    @Effect()
    deleteCustomer$:Observable<Action> = this.action$.pipe(
        ofType<customerActions.DeleteCustomer>(
            customerActions.CustomerActionTypes.DELETE_CUSTOMER
        ),
        map((action: customerActions.DeleteCustomer)=>action.payload),
        mergeMap((id:string)=>
            this.customerService.deleteCustomer(id).pipe(
                map(() => 
                    new customerActions.DeleteCustomerSuccess(id)
                ),
                catchError(err => of(new customerActions.DeleteCustomerFail(err)))
            ))
    );



}
