import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../models/Customer.models";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  id : number = -1;
  currentCustomer : Customer = new Customer(-1, '','','','');

  constructor(private customerService:CustomerService, private router : Router, private _Activatedroute:ActivatedRoute) { }

  /**
   * We get the id of the customer we are curently editing
   */
  ngOnInit(): void {
    // On récupère l'id du customer qui est en cours de modification
    this.id = parseInt(<string>this._Activatedroute.snapshot.paramMap.get("id"));
    this.currentCustomer = this.customerService.getCustomerById(this.id);
  }

  /**
   * Get the form and "parse" it to call customerService
   * @param form the form we get from the front
   */
  onSubmit(form: NgForm) {
    const firstName = form.value['firstName'];
    const name = form.value['name'];
    const email = form.value['email'];
    const number = form.value['number'];
    this.customerService.editCustomer(this.id, firstName, name, email, number);
    this.router.navigate(['/customer']);
  }
}
