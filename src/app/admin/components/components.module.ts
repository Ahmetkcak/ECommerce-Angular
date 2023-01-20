import { OrderModule } from './order/orders.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomerModule } from './customer/customer.module';
import { ProductsModule } from './products/products.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    CustomerModule,
    OrderModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
