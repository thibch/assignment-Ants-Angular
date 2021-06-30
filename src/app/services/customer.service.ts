import {Subject} from "rxjs";
import {Customer} from "../models/Customer.models";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CustomerService {
  customers: Customer[] = [
    // new Customer(0, 'Thibault', 'Choné', 'will@will.com', '0606060606')
  ];
  customerSubject = new Subject<Customer[]>();

  private optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) {
    this.getCustomersFromServer();
  }

  /**
   * Notify all the Subscribed component that customers has changed
   */
  emitCustomer() {
    this.customerSubject.next(this.customers);
  }

  /**
   * Return the customer with the right id
   * @param id the customer's id we are looking for
   */
  getCustomerById(id: number) : Customer{
    let find = this.customers.find(
      (s) => {
        return s.id === id;
      }
    );
    if(!find){ // In case we don't find
      find = new Customer(0, 'By','id', 'failed', ' ! ');
    }
    return find;
  }

  /**
   * Return the index in the array this.customer of the customer with the parameter id
   * @param id the customer's id we are looking for
   */
  getIndexCustomerById(id: number) : number{
    let index = 0;
    while(id !== this.customers[index].id) {
      index++;
    }
    if(this.customers[index].id !== id){ // In case we don't find
      return -1;
    }
    return index;
  }

  /**
   * We create a new customer and send it to the serveur
   * @param firstName first name of the customer
   * @param lastName last name of the customer
   * @param email email of the customer
   * @param phoneNumber phoneNumber of the customer
   */
  async addCustomer(firstName: string, lastName: string, email: string, phoneNumber: string){
    const customer = new Customer(0, firstName, lastName, email, phoneNumber);
    await this.saveOneCustomerToServer(customer); // We send the new customer to the server
    this.getCustomersFromServer();
  }

  /**
   * Editing the info of the customer with the id
   * @param id the customer id
   * @param firstName the firstname changed
   * @param name the name changed
   * @param email the email changed
   * @param phoneNumber the phone number changed
   */
  async editCustomer(id: number, firstName: string, name: string, email: string, phoneNumber: string){
    let customer = this.getCustomerById(id);
    customer.name = name;
    customer.firstName = firstName;
    customer.email = email;
    customer.phoneNumber = phoneNumber;
    await this.editOneCustomerToServer(customer); // We send the edited customer to the server
    this.getCustomersFromServer();
  }

  /**
   * Delete the customer with the right id
   * @param id the id where looking for
   */
  async deleteCustomer(id: number) {
    let index = this.getIndexCustomerById(id); // We get the index of the customer
    if (index > -1) {
      await this.deleteCustomerToServer(id); // We notify the serveur we want to delete the customer
      this.getCustomersFromServer();
    }
  }

  /**
   * Save A Customer on the distant serveur (POST API)
   * @param customer customer that will be saved
   */
  async saveOneCustomerToServer(customer: Customer) {
    const data = await this.httpClient
      .post('http://localhost:8080/api/v1/customer', JSON.stringify(customer), this.optionRequete)
      .toPromise()
      .catch(() => {
        console.log("Erreur POST Http");
      });
    // We wait for the request to end
    console.log("END POST");
  }

  /**
   * Delete the customer from the distant server
   * @param id The id of the customer where are deleting
   * @private
   */
  private async deleteCustomerToServer(id: number) {
    /* --- Asynchronous version ---
    this.httpClient
      .delete('http://localhost:8080/api/v1/customer/' + id, this.optionRequete)
      .subscribe(
        () => {
          console.log('Effacement' + id + ' terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/
    const data = await this.httpClient
      .delete('http://localhost:8080/api/v1/customer/' + id, this.optionRequete)
      .toPromise()
      .catch(() => {
        console.log("Erreur DELETE Http");
      });

    // We wait for the request to end
    console.log("END DELETE");
  }


  /**
   * We send the edited customer (the id is in the customer object)
   * PUT HTTP Request
   * @param customer the customer modified we send
   * @private
   */
  private async editOneCustomerToServer(customer: Customer) {
    /* --- Asynchronous version ---
      this.httpClient
        .put('http://localhost:8080/api/v1/customer/' + customer.id, JSON.stringify(customer), this.optionRequete)
        .subscribe(
          () => {
            console.log('Modification ' + customer.id + '  terminée !');
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );*/
    const data = await this.httpClient
      .put('http://localhost:8080/api/v1/customer/' + customer.id, JSON.stringify(customer), this.optionRequete)
      .toPromise()
      .catch(() => {
          console.log("Erreur PUT Http");
        });

    // We wait for the request to end
    console.log("End PUT")
  }

  /**
   * We get the list of customers
   * GET HTTP REQUEST
   */
  async getCustomersFromServer() {
    /* --- Asynchronous version ---
      this.httpClient
      .get<any[]>('http://localhost:8080/api/v1/customer')
      .subscribe(
        (response) => {
          this.customers = response;
          this.emitCustomer();
          console.log("Fin fonction subscribe");
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/

    // We get the data from the server
    const data = await this.httpClient.get<any[]>('http://localhost:8080/api/v1/customer')
      .toPromise().catch(
        () => {
          console.log("Erreur GET Http");
        });

    this.customers = [];
    if(data){ // If the data is present (If there is an error we get no data)
      for (let content of data) { // The data is an array of customers
        let customer = new Customer(content["id"], content["name"], content["firstName"], content["email"], content["phoneNumber"]);
        this.customers.push(customer);
      }
      this.emitCustomer();
    }
    console.log("END GET");
  }
}
