import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(
    private toastr:CustomToastrService,
    private userAuthService:UserAuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastr.message("Bu işlemi yapmaya yetkiniz yok.","Yetkisiz işlem.",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomRight
          })

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {
            
          });
          break;

        case HttpStatusCode.InternalServerError:
          this.toastr.message("Sunucuya erişilmiyor.","Sunucu hatası.",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomRight
          })
          break;

        case HttpStatusCode.BadRequest:
          this.toastr.message("Geçersiz istek yapıldı.","Geçersiz istek.",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomRight
          })
        break;

        case HttpStatusCode.NotFound:
          this.toastr.message("Sayfa bulunamadı.","Sayfa bulunamadı.",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomRight
          })
        break;

        default:
          this.toastr.message("Beklenmeyen bir hata meydana geldi.","Beklenmeyen hata.",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.BottomRight
          })
        break;
      }
      return of(error);
    }));
  }
}
