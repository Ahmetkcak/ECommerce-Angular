import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/common/signal-r.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { HubUrls } from 'src/app/constants/hub-urls';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private signalRService:SignalRService,private alertify:AlertifyService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub);
   }

  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction,message =>{
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.BottomRight
      })
    });
    this.showSpinner(SpinnerType.BallScaleMultiple)
  }

}
