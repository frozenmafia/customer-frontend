import * as fromCustomer from '../state/reducers/customer.reducer';
import { Component, OnInit, Directive } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Customer } from '../customer.model';
import * as customerActions from '../state/actions/customer.action';
import { Store } from '@ngrx/store';
import { CustomerService } from '../customer-services/customer.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.touched||control.dirty));
  }
}

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit{

  customerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    fb: FormBuilder,
    private store:Store<fromCustomer.AppState>,
    private customerService:CustomerService) {
    this.customerForm = fb.group({
        '_name': ['', Validators.required],
        '_phone': ['',Validators.required],
        '_address': ['', Validators.required],
        '_membership': ['', Validators.required]

    });
  }
  ngOnInit(): void {
  }
  show_phone_error():Boolean{
    return false
  }
  memberships= [
    {name: 'silver'},
    {name: 'Gold'},
    {name: 'Platinum'}
  ];
  customer: Customer;
  phone_number: string;
  submitted: boolean;
  
  createCustomer(credentials){
    console.log(credentials);
    this.customer=credentials.value;
    this.customer._phone=this.phone_number;
    this.submitted=true;
    this.store.dispatch(new customerActions.CreateCustomer(this.customer));
    this.customerForm.reset();
   }
  getNumber($event: string){
    console.log('number',$event);
    this.phone_number=$event;
  }
  get customer_Info(){
    if(this.submitted == true)
      return this.customer;
    else
      return null;
  }
}