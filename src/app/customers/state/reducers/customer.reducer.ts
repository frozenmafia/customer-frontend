import * as fromRoot from '../app-state';
import * as customerActions from '../actions/customer.action';
import { Customer } from '../../customer.model';
import { createFeatureSelector, createSelector, ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';
import { EntityAdapter,EntityState,createEntityAdapter} from '@ngrx/entity';
import { act } from '@ngrx/effects';



export interface CustomerState extends EntityState<Customer>{
    selectedCustomerId : string | null,
    loading  :boolean,
    loaded   :boolean,
    error    :string
}




export interface AppState extends fromRoot.AppState{
    customers:CustomerState
}

    
    
export const customerAdapter : EntityAdapter<Customer> = createEntityAdapter<Customer>({
    selectId:Customer=>Customer._id
});


export const defaultCustomer:CustomerState={
    ids:[],
    entities:{},
    selectedCustomerId :null,
    loading  :false,
    loaded   :false,
    error    :""

}


export const initialState= customerAdapter.getInitialState(defaultCustomer)

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
            return customerAdapter.addAll(action.payload,{
                ...state,
                entities:{},
                loading: false,
                loaded :true
            });
        }

        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL:{
            return{
                ...state,
                entities:{},
                loading:false,
                loaded:false,
                error:action.payload
            };
        }

        case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS:{
            return customerAdapter.addOne(action.payload,{
                ...state,
                selectedCustomerId:action.payload._id
            });
        }

        case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL:{
            return {
                ...state,
                error:action.payload
            };
        }

        case customerActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS:{
            return customerAdapter.addOne(action.payload,state);
        }

        case customerActions.CustomerActionTypes.CREATE_CUSTOMER_FAIL:{
            return {
                ...state,
                error:action.payload
            };
        }

        case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS:{
            return customerAdapter.updateOne(action.payload,state);
        }

        case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL:{
            return {
                ...state,
                error:action.payload
            };
        }

        case customerActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS:{
            return customerAdapter.removeOne(action.payload,state);
        }

        case customerActions.CustomerActionTypes.DELETE_CUSTOMER_FAIL:{
            return {
                ...state,
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
    customerAdapter.getSelectors().selectAll
);
export const getCustomersLoading = createSelector(
    getCustomerFeatureState,
    (state:CustomerState) => state.loading
);
export const getCustomersLoaded = createSelector(
    getCustomerFeatureState,
    (state:CustomerState) => state.loaded
);
export const getCustomerserror = createSelector(
    getCustomerFeatureState,
    (state:CustomerState) => state.error
);

export const getCurrentCustomerId = createSelector(
    getCustomerFeatureState,
    (state:CustomerState) => state.selectedCustomerId
);

export const getCurrentCustomer = createSelector(
    getCustomerFeatureState,
    getCurrentCustomerId,
    state => state.entities[state.selectedCustomerId]
);

