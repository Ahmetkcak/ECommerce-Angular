import { Directive, ElementRef, Renderer2,HostListener ,Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'src/app/services/common/dialog.service';
declare var $:any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpClientService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService,
    private dialogService:DialogService
    ) {
      const img  = _renderer.createElement("img");
      img.setAttribute("src","../../../../../assets/delete.png")
      img.setAttribute("style","cursor:pointer");
      img.width = 25;
      img.height = 25;
      _renderer.appendChild(element.nativeElement,img)
     }

     @Input() id:number
     @Input() controller:string
     @Output() callback: EventEmitter<any> = new EventEmitter();

     @HostListener("click")
    async onclick(){
      this.dialogService.openDialog({
        componentType : DeleteDialogComponent,
        data:DeleteState.Yes,
        afterClosed:async () =>{
          const td : HTMLTableCellElement = this.element.nativeElement;
          this.httpClientService.delete({
            controller:this.controller
          },this.id).subscribe(data=>{
            $(td.parentElement).animate({
              opacity:0,
              left:"+=50",
              height:"toogle"
            },700,() => {
              this.callback.emit();
              this.alertifyService.message("Ürün başarıyla silindi.",{
                dismissOthers:true,
                messageType:MessageType.Success,
                position:Position.BottomRight
              })
            })
          },(errorResponse:HttpErrorResponse) =>{
            this.alertifyService.message("Beklenmeyen bir hata oluştu.",{
              dismissOthers:true,
              messageType:MessageType.Error,
              position:Position.BottomRight
            })
          })
        }
      });
     }
}
