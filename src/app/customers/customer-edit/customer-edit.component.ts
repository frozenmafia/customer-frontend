import { SharedService } from './../shared-services/shared.service';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import * as fromCustomer from '../state/reducers/customer.reducer';
import { Component, OnInit, Directive, Input, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Customer } from '../customer.model';
import * as customerActions from '../state/actions/customer.action';
import { Store, select } from '@ngrx/store';
import { CustomerService } from '../customer-services/customer.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.touched||control.dirty));
  }
}

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit,OnDestroy {
  editCustomerForm: FormGroup;
  customer$: Observable<Customer>;
  customer_to_be_edited: Customer;
  edited_customer:Customer;
  matcher = new MyErrorStateMatcher();
  isDisabled = true;
  memberships= [
    {name: 'silver'},
    {name: 'Gold'},
    {name: 'Platinum'}
  ];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private store:Store<fromCustomer.AppState>,
    private customerService:CustomerService,
    private sharedService : SharedService) {

    }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
      this.editCustomerForm = this.fb.group({
      '_address': ['', Validators.required],
      '_id':null,
      '_membership': [''],
      '_name': ['', Validators.required],
      '_phone': ['',Validators.required],
       
      
    });
    this.disableForm();

    this.sharedService.getClickEvent().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      ()=>{
        this.enableForm();
      }
    )
  }

  disableForm(){
    this.editCustomerForm.reset();
    this.isDisabled = true
  }
  enableForm(){
    this.isDisabled = false
    this.customer$= this.store.select(fromCustomer.getCurrentCustomer);
    this.customer$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (currentCustomer:Customer)=>{
        console.log('000000000000000000',currentCustomer);
        if(currentCustomer){
          this.editCustomerForm.patchValue({
            _name:currentCustomer._name,
            _phone:currentCustomer._phone,
            _address:currentCustomer._address,
            _membership:currentCustomer._membership,
            _id:currentCustomer._id
  
          })
        }
        this.customer_to_be_edited=currentCustomer;
      })
    this.isDisabled = false
  }
  editCustomer(credentials: { value: Customer; }){
    this.edited_customer = credentials.value;

    if(
      this.edited_customer._name === this.customer_to_be_edited._name &&
      this.edited_customer._address === this.customer_to_be_edited._address &&
      this.edited_customer._membership === this.customer_to_be_edited._membership &&
      this.edited_customer._phone === this.customer_to_be_edited._phone &&
      this.edited_customer._id === this.customer_to_be_edited._id
      ){
      console.log('same')
    }
    else{
      console.log('different')
      this.updateCustomer(this.edited_customer);
    }
    this.disableForm()
  }
  updateCustomer(edited_customer: Customer){

    this.store.dispatch(new customerActions.UpdateCustomer(edited_customer));

  }
}
