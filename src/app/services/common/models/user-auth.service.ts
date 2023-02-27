import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClientService:HttpClientService,
    private toastr : CustomToastrService
  ) { }

  async login(UsernameOrMail: string, Password: string, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, {UsernameOrMail,Password})

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      this.toastr.message("Kullanıcı girişi başarıyla gerçekleşti","Giriş başarılı",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.BottomRight
      })
    }
    callBackFunction();
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastr.message("Google üzerinden giriş başarılı.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      });
    }

    callBackFunction();
  }
}
