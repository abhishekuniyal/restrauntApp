import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { Order } from 'src/app/shared/order.model';
import { OrderItem } from 'src/app/shared/order-item.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemComponent } from '../order-item/order-item.component';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItems } from 'src/app/shared/order-items.model';
import { OrdersService } from 'src/app/shared/orders.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {

  formData: Order;
  orderItems: OrderItems[];
  customers: Customer[];
  isFormValid:boolean = true;

  constructor(private custService: CustomerService,
    private dailog: MatDialog,
    private _ordersService: OrdersService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm() {
    this.formData = {
      orderNo: Math.floor(10000 + Math.random() * 900000).toString(),
      pMethod: '',
      customerId: 0,
      gTotal: 0
    };
    this.orderItems = [];
    this.custService.getCustName().then((res: Customer[]) => {
      this.customers = res;
    });
    this.orderItems = this._ordersService.ordersItems;
  }
  AddOrEditOrderItem(orderItemIndex, orderNo) {

    const dailogConfig = new MatDialogConfig();
    dailogConfig.autoFocus = true;
    dailogConfig.disableClose = true;
    dailogConfig.width = "60%";
    dailogConfig.data = { orderItemIndex, orderNo };

    this.dailog.open(OrderItemComponent, dailogConfig).afterClosed().subscribe(res => {
      this.orderItems = this._ordersService.ordersItems;
      this.formData.gTotal = this.orderItems.reduce(function (a, b) {
        return a + b.itemTotal;
      }, 0);
    });
  }

  onDeleteOrderItem(orderItemIndex, orderNo) {
    this._ordersService.ordersItems.splice(orderItemIndex, 1);
  }

  submit(form: NgForm) {
    if (this.validate()) {
      this._ordersService.saveOrder(this.formData,this.orderItems).then(res =>{
        
        //if(res.)
        this.router.navigate(['orders']);
      });
    }
  }

  validate():boolean{
    if(this.formData.pMethod == ""  || this.formData.pMethod == "-Select-" || this.formData.customerId ==0 ){
      this.isFormValid = false;
    }else if(this.orderItems.length == 0){
      this.toastr.warning('please select at least one Order Item.','Restraunt App')
      this.isFormValid = false;
    }
    else{
      this.isFormValid = true;
    }
    return this.isFormValid;
  }
  viewOrders(){
    this.router.navigate(['orders']);
  }

}
