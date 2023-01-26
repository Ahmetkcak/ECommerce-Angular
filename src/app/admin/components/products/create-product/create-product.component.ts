import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Add_Product } from 'src/app/contracts/Add_Product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent implements OnInit {

  constructor(private productService:ProductService,spinner:NgxSpinnerService,private alertify:AlertifyService) {
    super(spinner);
   }

  ngOnInit(): void {
  }

  addProduct(name:HTMLInputElement,price:HTMLInputElement,stock:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom)
    const addProduct:Add_Product = new Add_Product();
    addProduct.name = name.value;
    addProduct.price = parseInt(price.value);
    addProduct.stock = parseInt(price.value)

    this.productService.addProduct(addProduct,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklendi",{
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.BottomRight
      })
    }, errorMessage => {
      this.alertify.message(errorMessage,{
        dismissOthers : true,
        messageType : MessageType.Error,
        position : Position.BottomRight
      })
    });
  }
}
