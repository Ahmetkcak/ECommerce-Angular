import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(
  private jwtHelper : JwtHelperService,
  private router : Router,
  private toastr : CustomToastrService
  ){

}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const token : string = localStorage.getItem("accessToken");

    //const decodeToken : string = this.jwtHelper.decodeToken(token);
    //const expirationDate : Date = this.jwtHelper.getTokenExpirationDate(token);
    let expired : boolean;

    try {
      expired = this.jwtHelper.isTokenExpired(token)
    } catch {
      expired = true;
    }


    if(!token || expired){
      this.router.navigate(["login"],{queryParams:{returnUrl:state.url}});
      this.toastr.message("Oturum açmanız gerekiyor.","Yetkisiz erişim",{
        messageType : ToastrMessageType.Warning,
        position:ToastrPosition.BottomRight
      })
    }

    return true;
  }
  
}
