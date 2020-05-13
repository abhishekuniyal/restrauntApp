import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { LoginComponent } from './auth/login/login.component';
import { Auth } from './utility/auth';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent, canActivate: [Auth] },
  { path: 'login', component: LoginComponent },
  {
    path: 'order', children: [
      { path: '', component: OrderComponent },
      { path: 'edit/:id', component: OrderComponent }], canActivate: [Auth]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
