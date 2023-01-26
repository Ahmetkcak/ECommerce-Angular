import { Injectable } from '@angular/core';
import { Add_Product } from 'src/app/contracts/Add_Product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  addProduct(product:Add_Product,successCallBack?:any){
    this.httpClientService.post({
      controller:"products"
    },product)
    .subscribe(result => {  
      successCallBack();
    })
  }
}
