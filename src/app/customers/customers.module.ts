import { DisableFormComponent } from './disable-form.component';
import { MaterialModule } from './../material/material.module';
import { CustomerEffects } from './state/effects/customer.effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { Routes, RouterModule } from '@angular/router';
import { customerReducer} from './state/reducers/customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2TelInputModule} from 'ng2-tel-input';

const customerRoutes:Routes =[{path:"",component:CustomerComponent}]

@NgModule({
  declarations: [CustomerComponent, CustomerAddComponent, CustomerEditComponent, CustomerListComponent,DisableFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    StoreModule.forFeature('customers',customerReducer),
    EffectsModule.forFeature([CustomerEffects]),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule
  ]
})
export class CustomersModule { }
