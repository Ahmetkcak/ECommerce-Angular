import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ResetPasswordComponent}
    ]),
  ]
})
export class ResetPasswordModule { }
