import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit, OnDestroy {
  customers: any[] = [];

  customerSubscription: Subscription = new Subscription();

  constructor(private customerService : CustomerService) { }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  /**
   * We define the subscription
   * When the subscription is trigger we get all the customers from the service
   */
  ngOnInit(): void {
    // On met en place une "observation" du Subject, quand le subject "se met à jour" alors la fonction ci-dessous s'active
    this.customerSubscription = this.customerService.customerSubject.subscribe(
      (customers: any[]) => {
        this.customers = customers;
      }
    );
    this.customerService.emitCustomer(); // On "met à jour" le Subject (pour trigger la fonction)
  }

}
