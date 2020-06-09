
import { Component, OnInit, Directive } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Customer } from '../customer.model';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched||control.dirty|| isSubmitted));
  }
}

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit{

  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
        'name': ['', Validators.required],
        'phone': ['',Validators.required],
        'address': ['', Validators.required],
        'membership': ['', Validators.required]

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
  
  submit(credentials):Customer{
    this.customer=credentials.value;
    this.customer.phone=this.phone_number;
    this.submitted=true;
    return this.customer;
  }
  getNumber($event){
    console.log('number',$event);
    this.phone_number=$event;
  }
  show_customer(){
    console.log(this.customer);
  }
  get customer_Info(){
    if(this.submitted == true)
      return this.customer;
    else
      return null;
  }
}