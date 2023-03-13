import { Injectable } from '@angular/core';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async createOrder(order:Create_Order):Promise<any>{
    const observale: Observable<any> = this.httpClientService.post({
      controller:"orders"
    },order);

    await firstValueFrom(observale);
  }
}
