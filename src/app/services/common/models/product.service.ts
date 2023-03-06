import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Add_Product } from 'src/app/contracts/Add_Product';
import { List_Product } from 'src/app/contracts/list_products';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
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
  const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = lastValueFrom(this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
    controller: "products",
    queryString: `page=${page}&size=${size}`
  }));
  return promiseData;
}

async delete(id:number){
  const deleteObservale :Observable<any> = this.httpClientService.delete<any>({
    controller:"products"
    },id)
    await firstValueFrom(deleteObservale);
  }

async  listImages(id:number):Promise<List_Product_Image[]>{
    const getObservale : Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action:"getProductImages",
      controller:"products"
    },id);

    return await firstValueFrom(getObservale);
  }

async deleteProductImage(id:number,imageId:number,callBack?:() => void){
  const deleteObservale = this.httpClientService.delete({
    action:"deleteProductImage",
    controller:"products",
    queryString:`imageId=${imageId}`
  },id)
  await firstValueFrom(deleteObservale);
  callBack();
}

async changeShowcaseImage(imageId:number,productId:number,successCallBack?:()=>void):Promise<void>{
  const changeShowcaseImageObservable = this.httpClientService.get({
    controller:"products",
    action:"ChangeShowCaseImage",
    queryString:`imageId=${imageId}&productId=${productId}`
  })
  await firstValueFrom(changeShowcaseImageObservable);
  successCallBack();
}
}
