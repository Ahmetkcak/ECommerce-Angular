import { Injectable } from '@angular/core';
import { Add_User } from 'src/app/contracts/users/add_user';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';
import { first, firstValueFrom,Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService:HttpClientService,
    private toastr : CustomToastrService
    ) { }

  async add(user:User) : Promise<Add_User>{
    const observable:Observable<Add_User | User> = this.httpClientService.post<Add_User | User>({
      controller:"users"
    },user)

    return await firstValueFrom(observable) as Add_User
  }

  async login(UsernameOrMail: string, Password: string, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "users",
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
      controller: "users"
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
