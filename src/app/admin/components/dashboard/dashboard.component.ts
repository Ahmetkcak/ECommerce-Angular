import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple)
  }

}
