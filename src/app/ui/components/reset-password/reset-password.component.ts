import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent{

  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,private alertify:AlertifyService){
    super(spinner);
  }

  passwordReset(email:string){
    this.showSpinner(SpinnerType.BallAtom);
    this.userAuthService.passwordReset(email,()=>{
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Mail başarıyla gönderilmiştir",{
        messageType:MessageType.Notify,
        position:Position.BottomRight
      })
    });
  }
}
