import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from "./services/auth.service";
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { NewCustomerComponent } from './customer-all/new-customer/new-customer.component';
import { CustomerComponent } from './customer-all/customer/customer.component';
import { CustomerViewComponent } from './customer-all/customer-view/customer-view.component';
import {CustomerService} from "./services/customer.service";
import { EditCustomerComponent } from './customer-all/edit-customer/edit-customer.component';
import {HttpClientModule} from "@angular/common/http";

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'customer', component: CustomerViewComponent },
  { path: 'customer/:id', component: EditCustomerComponent },
  { path: 'new-customer', component: NewCustomerComponent },
  { path: '', component: CustomerViewComponent }, // Attention avec le call à canActivate
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FourOhFourComponent,
    NewCustomerComponent,
    CustomerComponent,
    CustomerViewComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuthService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
