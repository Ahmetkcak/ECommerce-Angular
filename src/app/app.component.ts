import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Component } from '@angular/core';
declare var $:any 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce';

  constructor(){}
}
