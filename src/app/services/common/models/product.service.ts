import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Add_Product } from 'src/app/contracts/Add_Product';
import { List_Product } from 'src/app/contracts/list_products';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  addProduct(product:Add_Product,successCallBack?:() => void,errorCallBack?: (errorMessage: string) => void){
    this.httpClientService.post({
      controller:"products"
    },product)
    .subscribe(result => {  
      successCallBack();
    }, (errorResponse:HttpErrorResponse) => {
      const _error : Array<{key:string,value:Array<string>}> = errorResponse.error
      let message = "";
      _error.forEach((v,index) => {
        v.value.forEach((_v,_index) => {
          message += `${_v}<br>`;
        })
      });
      errorCallBack(message);
  });
}


async listProducts(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {
  const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
    controller: "products",
    queryString: `page=${page}&size=${size}`
  }).toPromise();

  promiseData.then(d => successCallBack())
    .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

  return await promiseData;
}

async delete(id:number){
  const deleteObservale :Observable<any> = this.httpClientService.delete<any>({
    controller:"products"
    },id)
    await firstValueFrom(deleteObservale);
  }
}
