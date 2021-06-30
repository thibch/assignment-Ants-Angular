import {Component, Input, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Input() id: number = 0;
  @Input() fisrtName: string = '.';
  @Input() name: string = '.';
  @Input() email: string = '.';
  @Input() phoneNumber: string = '.';

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }


  deleteCustomer() {
    this.customerService.deleteCustomer(this.id);
    this.router.navigate(['/customer']);
  }
}
