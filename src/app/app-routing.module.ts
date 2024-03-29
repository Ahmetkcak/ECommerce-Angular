import { UiModule } from './ui/ui.module';
import { HomeComponent } from './ui/components/home/home.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,children:[
    {path:"",component:DashboardComponent},
    {path:"customers",loadChildren:()=>import("./admin/components/customer/customer.module").then(module=>module.CustomerModule),canActivate: [AuthGuard]},
    {path:"products",loadChildren:()=>import("./admin/components/products/products.module").then(module=>module.ProductsModule),canActivate: [AuthGuard]},
    {path:"order",loadChildren:()=>import("./admin/components/order/orders.module").then(module=>module.OrderModule),canActivate: [AuthGuard]},
    {path:"authorize-menu",loadChildren:()=>import("./admin/components/authorize-menu/authorize-menu.module").then(module=>module.AuthorizeMenuModule),canActivate: [AuthGuard]}
  ],canActivate: [AuthGuard]
  },
  {path:"",component:HomeComponent},
  {path:"baskets",loadChildren:()=>import("./ui/components/baskets/baskets.module").then(module=>module.BasketsModule)},
  {path:"products",loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)},
  {path:"products/:pageNo",loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)},
  {path:"register",loadChildren:()=>import("./ui/components/register/register.module").then(module=>module.RegisterModule)},
  {path:"login",loadChildren:()=>import("./ui/components/login/login.module").then(module=>module.LoginModule)},
  {path:"password-reset",loadChildren:()=>import("./ui/components/reset-password/reset-password.module").then(module=>module.ResetPasswordModule)},
  {path:"update-password/:userId/:resetToken",loadChildren:()=>import("./ui/components/update-password/update-password.module").then(module=>module.UpdatePasswordModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
