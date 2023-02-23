import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
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

    if(!_isAuthenticated){
      this.router.navigate(["login"],{queryParams:{returnUrl:state.url}});
      this.toastr.message("Oturum açmanız gerekiyor.","Yetkisiz erişim",{
        messageType : ToastrMessageType.Warning,
        position:ToastrPosition.BottomRight
      })
    }

    return true;
  }
  
}
