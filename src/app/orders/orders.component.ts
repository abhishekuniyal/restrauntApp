import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../shared/orders.service';
import { Order } from '../shared/order.model';
import { Orders } from '../shared/orders.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private _ordersService: OrdersService,
    private router: Router) { }

  formdata: Orders[];

  ngOnInit(): void {
    this.toastr.success('Order placed successfully')
    this._ordersService.getsavedOrders().then(res => {
      this.formdata = res as Orders[];
    });
  }

  deleteOrder(i: number) {
    if (confirm('Sure want to delete?')) {
      this.toastr.warning('Order Deleted Successfully', 'Restraunt App')
      this.formdata.splice(i, 1);
    }
  }

  editOrder(i: number) {
    // this.router.navigate['/orderedit/:id', this.formdata[i].orderNo];
  }

  createNewOrder() {
    this.router.navigate(['order']);
  }

}
