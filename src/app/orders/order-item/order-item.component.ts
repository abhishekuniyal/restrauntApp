import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { Form, NgForm } from '@angular/forms';
import { OrderItems } from 'src/app/shared/order-items.model';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: [
  ]
})
export class OrderItemComponent implements OnInit {

  formData: OrderItem;
  items: Item[];
  orderItem: OrderItems;
  itemNameReadOnly: boolean = false;

  constructor(public dialogRef: MatDialogRef<OrderItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderItemIndex: number, orderNo: number },
    private _itemService: ItemService,
    private _ordersService: OrdersService) { }

  ngOnInit(): void {
    if (this.data.orderItemIndex == null) {
      this.formData = {
        itemId: 0,
        itemName: '',
        itemPrice: 0,
        itemQuantity: 0,
        itemTotal: 0
      }
      this._itemService.getItemName().then(res => {
        this.items = res as Item[];
      });
    } else {
      var i: Item[] = [
        {
          itemId: this._ordersService.ordersItems[this.data.orderItemIndex].itemId,
          itemName: this._ordersService.ordersItems[this.data.orderItemIndex].itemName,
          itemPrice: this._ordersService.ordersItems[this.data.orderItemIndex].itemPrice
        }];
      this.items = i;

      this.itemNameReadOnly = true;
      this.formData = {
        itemId: this._ordersService.ordersItems[this.data.orderItemIndex].itemId,
        itemName: this._ordersService.ordersItems[this.data.orderItemIndex].itemName,
        itemPrice: this._ordersService.ordersItems[this.data.orderItemIndex].itemPrice,
        itemQuantity: this._ordersService.ordersItems[this.data.orderItemIndex].itemQuantity,
        itemTotal: this._ordersService.ordersItems[this.data.orderItemIndex].itemTotal
      }
    }

  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex != 0)
      this.formData.itemId = this.items[ctrl.selectedIndex].itemId;
    this.formData.itemPrice = this.items[ctrl.selectedIndex].itemPrice;
  }
  updateTotal() {
    this.formData.itemTotal = this.formData.itemPrice * this.formData.itemQuantity;
    console.log(this.formData)
  }

  formSubmit(form: NgForm) {
    this.orderItem = {
      itemId: this.formData.itemId,
      itemName: this.formData.itemName,
      itemQuantity: this.formData.itemQuantity,
      itemPrice: this.formData.itemPrice,
      itemTotal: this.formData.itemTotal
    };
    if (this.data.orderItemIndex == null) {
      this._ordersService.ordersItems.push(this.orderItem);
    } else {
      this._ordersService.ordersItems[this.data.orderItemIndex].itemQuantity = this.orderItem.itemQuantity;
      this._ordersService.ordersItems[this.data.orderItemIndex].itemTotal = this.orderItem.itemTotal;
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}

