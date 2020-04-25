import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderItems } from './order-items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {



  constructor(private http: HttpClient) {

  }

  getItemName(): any {
    return this.http.get(environment.apiURL + '/items').toPromise();
  }
}
