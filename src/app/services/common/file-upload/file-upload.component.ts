import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService:HttpClientService,
    private alertifyService:AlertifyService,
    private customToastrService:CustomToastrService
  ){}

  public files: NgxFileDropEntry[];

  @Input() options:Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData:FormData = new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file:File) =>{
        fileData.append(_file.name,_file, file.relativePath)
      })
    }
     this.httpClientService.post({
      controller:this.options.controller,
      action:this.options.action,
      queryString:this.options.queryString,
      headers:new HttpHeaders({"responseType":"blob"})
     },fileData).subscribe(data => {
      const message:string= "Dosyalar başarıyla yüklendi."
      if(this.options.isAdminPage){
        this.alertifyService.message(message,{
          dismissOthers:true,
          messageType:MessageType.Success,
          position:Position.BottomRight
        })
      }else{
        this.customToastrService.message(message,"Başarılı",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.BottomCenter,
        })
      }
     },(errorResponse:HttpErrorResponse) =>{
      const message:string= "Dosyalar yüklenirken bir hata meydana geldi."
      if(this.options.isAdminPage){
        this.alertifyService.message(message,{
          dismissOthers:true,
          messageType:MessageType.Error,
          position:Position.BottomRight
        })
      }else{
        this.customToastrService.message(message,"Hata",{
          messageType:ToastrMessageType.Error,
          position:ToastrPosition.BottomCenter,
        })
      }
     })
  }

}

  export class FileUploadOptions{
    controller?:string;
    action?:string;
    queryString?:string;
    explanation?:string;
    accept?:string;
    isAdminPage?:boolean =false
}

