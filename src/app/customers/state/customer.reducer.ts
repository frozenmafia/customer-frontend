import * as fromRoot from './app-state';
import * as customerActions from './customer.action';
import { Customer } from '../customer.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const initialState:CustomerState = {
    customers:[],
    loading:false,
    loaded:true,
    error :""
};

export interface CustomerState{
    customers:Customer[],
    loading  :boolean,
    loaded   :boolean,
    error    :string 
}

export interface AppState extends fromRoot.AppState{
    customers:CustomerState
}

export function customerReducer(state=initialState,
    action:customerActions.action
    ):CustomerState
    {
    switch(action.type){
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS:{
            return{
                ...state,
                loading:true,
                loaded:false
            };
        }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS:{
            return {
                ...state,
                loading: false,
                loaded :true,
                customers:action.payload
            }
        }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL:{
            return{
                ...state,
                customers:[],
                loading:false,
                loaded:false,
                error:action.payload
            }
        }
        default:{
            return state;
        }
    }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
    "customers"
)

export const getCustomers = createSelector(
    getCustomerFeatureState,
    (state:CustomerState) => state.customers
)
export const getCustomersLoading = createSelector(
    getCustomerFeatureState,
    (state:CustomerState) => state.loading
)
export const getCustomersLoaded = createSelector(
    getCustomerFeatureState,
    (state:CustomerState) => state.loaded
)
export const getCustomerserror = createSelector(
    getCustomerFeatureState,
    (state:CustomerState) => state.error
)