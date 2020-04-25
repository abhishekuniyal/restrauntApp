import { Injectable } from '@angular/core';
import { OrderItems } from './order-items.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  ordersItems:OrderItems[] = [];
  constructor(private http: HttpClient) { }

  saveOrder(formdata, orderItems){
    var body = {
        ...formdata,
        OrderItems: orderItems
    }
    return this.http.post(environment.apiURL+'/saveOrder',body).toPromise();
  }
  getsavedOrders(){
    return this.http.get(environment.apiURL+'/savedOrder').toPromise();
  }
}
