import { Product } from './../../../contracts/product';
import { HttpClientService } from './../../../services/common/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private httClientService:HttpClientService) {
    super(spinner);
   }

  ngOnInit(): void {

   
    this.httClientService.get<Product[]>({
      controller:"products"
    }).subscribe(data => console.log(data));

    // this.httClientService.post({
    //   controller:"products"
    // },{
    //   name:"Kalem",
    //   price:56,
    //   stock:156
      
    // }).subscribe()


    // this.httClientService.put({
    //   controller:"products"
    // },{
    //   id:2,
    //   name:"computer",
    //   stock:12,
    //   price:11000
    // }).subscribe();


    // this.httClientService.delete({
    //   controller:"products"
    // },4).subscribe()

  }

}
