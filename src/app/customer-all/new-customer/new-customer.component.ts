import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})

export class NewCustomerComponent implements OnInit {

  constructor(private customerService:CustomerService, private router : Router) { }

  ngOnInit(): void {
  }

  /**
   * Get the form and "parse" it to call customerService
   * @param form the form we get from the front
   */
  onSubmit(form: NgForm) {
    const firstName = form.value['firstName'];
    const lastName = form.value['name'];
    const email = form.value['email'];
    const number = form.value['number'];
    this.customerService.addCustomer(firstName, lastName, email, number);
    this.router.navigate(['/customer']);
  }
}
