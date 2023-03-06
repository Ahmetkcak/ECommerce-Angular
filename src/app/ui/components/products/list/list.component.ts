import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async } from 'rxjs';
import { List_Product } from 'src/app/contracts/list_products';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize : number = 12;
  pageList : number[] = [];
  url : string = "https://ecommerce3.blob.core.windows.net";

  produtcs: List_Product[];
  

  constructor(
    private productService: ProductService,
    private activatedRout: ActivatedRoute
  ) {}

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
      this.produtcs = this.produtcs.map<List_Product>(p=>{;
        const listProduct:List_Product = {
          id:p.id,
          createdDate:p.createdDate,
          imagePath:`${this.url}/${p.productImage.length ? p.productImage.find(p=>p.showcase).path : "abc"}`,
          name:p.name,
          price:p.price,
          stock:p.stock,
          updatedDate:p.updatedDate,
          productImage:p.productImage
        };
        return listProduct;
      })
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
}
