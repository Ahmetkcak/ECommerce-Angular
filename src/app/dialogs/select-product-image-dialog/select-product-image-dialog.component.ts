import { Component, Inject ,OnInit,Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { async } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{

  constructor(dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState,
    private productService:ProductService,
    private dialogService:DialogService
    ) {
    super(dialogRef)
   }

   @Output() options:Partial<FileUploadOptions> = {
    accept:".png, .jpg, .jpeg,",
    action:"upload",
    controller:"products",
    explanation:"Resimleri sürükleyin veya seçin...",
    isAdminPage:true,
    queryString: `id=${this.data}`
   }

   images:List_Product_Image[]

   async ngOnInit() {
    this.images = await this.productService.listImages(this.data);
  }

  async deleteImage(imageId:number,event:any){

    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed: async () => {
        await this.productService.deleteProductImage(this.data,imageId,() => {
          var card = $(event.srcElement).parent().parent();
          card.fadeOut(500);
        })
      }
    })
  }

}


export enum SelectProductImageState{
  Close
}