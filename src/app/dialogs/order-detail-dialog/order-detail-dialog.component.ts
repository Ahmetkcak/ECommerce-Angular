import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit{

  constructor(
    dialogRef:MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | number,
    private orderSerivce:OrderService,
    private dialogService:DialogService,
    private toastr:CustomToastrService) {
    super(dialogRef);
   }

   singleOrder:SingleOrder;

   displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
   dataSource = [];
   clickedRows = new Set<any>();
   totalPrice:number;

 async ngOnInit(){
    this.singleOrder = await this.orderSerivce.getByIdOrder(this.data);
    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems.map((basketItem,index) => basketItem.price * basketItem.quantity).reduce((price,current) => price+current);    
  }

  completeOrder(){
    this.dialogService.openDialog({
      componentType:CompleteOrderDialogComponent,
      data:CompleteOrderState.Yes,
      afterClosed: async () =>{
        await this.orderSerivce.completeOrder(this.data as number);
        this.toastr.message("Sipariş başarıyla tamamlanmıştır.","Sipariş tamamlandı.",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.BottomRight
        })
      }
    })
  }

}

export enum OrderDetailDialogState {
  Close,
  OrderComplete
}

