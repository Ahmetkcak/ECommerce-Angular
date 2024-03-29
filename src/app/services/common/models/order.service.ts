import { Injectable } from '@angular/core';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable} from 'rxjs';
import { List_Order } from 'src/app/contracts/order/list_order';
import { SingleOrder } from 'src/app/contracts/order/single_order';

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


  async getAllOrders(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void):Promise<{totalCount:number,orders:List_Order[]}>{
    const observale: Observable<{totalCount:number,orders:List_Order[]}> = this.httpClientService.get({
      controller:"orders",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observale);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error))
    return await promiseData;
  }


  async getByIdOrder(id:number,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable:Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({
      controller:"orders"
    },id)

    const promiseData = firstValueFrom(observable);
    promiseData.then(value=>successCallBack())
      .catch(error=>errorCallBack(error))
    return await promiseData;
  }

  async completeOrder(id:number){
    const observable:Observable<any> = this.httpClientService.get({
      controller:"orders",
      action:"complete-order"
    },id);

    await firstValueFrom(observable)
  }
}
