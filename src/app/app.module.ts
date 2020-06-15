import { MaterialModule } from './material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomersModule } from './customers/customers.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import { HomeComponent } from './home/home.component';
 
import { MainNavComponent } from './main-nav/main-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    CustomersModule,
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule
  ],
  exports:[MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
