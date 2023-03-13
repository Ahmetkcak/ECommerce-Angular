import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $:any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(
    private basketService:BasketService,
    private orderService:OrderService,
    private toastr:CustomToastrService,
    private router:Router,
    spinner:NgxSpinnerService
  ) { super(spinner)}

  basketItems :List_Basket_Item[];

  async ngOnInit():Promise<void> {
    this.basketItems = await this.basketService.get()
  }

  async changeQuantity(object:any){
    const basketItemId : number =  object.target.attributes["id"].value
    const quantity : number = object.target.value
    const basketItem : Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;    
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
  }

  async removeBasketItem(basketItemId:number){
    $("."+basketItemId).fadeOut(500);
    await this.basketService.remove(basketItemId);
  }

  async shoppingComplete(){
    const order:Create_Order = new Create_Order();
    order.address = "Antalya";
    order.description = "Açıklama";
    await this.orderService.createOrder(order);
    this.toastr.message("Sipariş alınmıştır.","Sipariş oluşturuldu.",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.BottomRight
    })
    this.router.navigate(["/"]);
  }
}
