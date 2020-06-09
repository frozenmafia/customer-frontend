import { LoadCustomers } from './customer.action';
import { getCustomers } from './customer.reducer';
import { Action } from '@ngrx/store';
import { Observable,of } from 'rxjs';
import { map,mergeMap,catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { CustomerService } from '../customer-services/customer.service';
import * as customerActions from '../state/customer.action';
import { Customer } from '../customer.model';

@Injectable()
export class CustomerEffects{

    constructor(
        private action$:Actions,
        private customerService:CustomerService
    ){}

    /*
    loadCustomers$ = createEffect(() => this.action$.pipe(
        ofType<customerActions.LoadCustomers>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMERS
        ),
        mergeMap(() =>this.customerService.getCustomers()
        .pipe(
            map(
                (customers:Customer[])=>
                    new customerActions.LoadCustomersSuccess(customers)
                ),
            catchError(err=>of(new customerActions.LoadCustomersFail(err)))
            ))
        )
    );
}
*/

    @Effect()
    loadCustomers$:Observable<unknown> = this.action$.pipe(
        ofType<customerActions.LoadCustomers>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMERS
        ),
        mergeMap((actions:customerActions.LoadCustomers) =>
            this.customerService.getCustomers().pipe(
                map(
                    (customers:Customer[])=>
                    new customerActions.LoadCustomersSuccess(customers)
                ),
                catchError(err=>of(new customerActions.LoadCustomersFail(err)))
            )
        )
    );
}
