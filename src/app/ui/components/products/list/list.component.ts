import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_products';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize : number = 12;
  pageList : number[] = [];
  url : string = "https://ecommerce3.blob.core.windows.net";

  produtcs: List_Product[];
  

  constructor(
    private productService: ProductService,
    private activatedRout: ActivatedRoute,
    private basketService:BasketService,
    spinner : NgxSpinnerService,
    private toastr:CustomToastrService
  ) {
    super(spinner)
  }

  ngOnInit() {
    this.activatedRout.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);

      const data: { totalCount: number; products: List_Product[] } =
        await this.productService.listProducts(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errorMessage) => {}
        );
      this.produtcs = data.products;
      // this.produtcs = this.produtcs.map<List_Product>(p=>{;
      //   const listProduct:List_Product = {
      //     id:p.id,
      //     createdDate:p.createdDate,
      //     imagePath:`${this.url}/${p.productImage.length ? p.productImage.find(p=>p.showcase).path : "abc"}`,
      //     name:p.name,
      //     price:p.price,
      //     stock:p.stock,
      //     updatedDate:p.updatedDate,
      //     productImage:p.productImage
      //   };
      //   return listProduct;
      // })
      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });
  }

  async addToBasket(product:List_Product){
    let _basketItem:Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem)
    this.toastr.message("Ürün sepete eklenmiştir","Sepete Eklendi",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.BottomRight
    })
  }
}
