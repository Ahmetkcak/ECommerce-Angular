import { HttpClientService } from '../http-client.service';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private httpClientService:HttpClientService
  ) { }

  async get():Promise<List_Basket_Item[]>{
    const observable : Observable<List_Basket_Item[]> = this.httpClientService.get({
      controller:"baskets"
    });
    return await firstValueFrom(observable)
  }

  async add(basketItem:Create_Basket_Item):Promise<any>{
    const abservable:Observable<any> = this.httpClientService.post({
      controller:"baskets"
    },basketItem)
    await firstValueFrom(abservable);
  }


  async updateQuantity(basketItem:Update_Basket_Item):Promise<void>{
    const observable : Observable<any> = this.httpClientService.put({
      controller:"baskets"
    },basketItem);
    await firstValueFrom(observable);
  }

  async remove(basketItemId:number){
    const observable : Observable<any> = this.httpClientService.delete({
      controller:"baskets"
    },basketItemId);

    await firstValueFrom(observable);
  }
}
