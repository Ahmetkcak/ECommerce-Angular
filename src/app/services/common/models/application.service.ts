import { Injectable } from '@angular/core';
import { Menu } from 'src/app/contracts/application-configurations/menu';
import { firstValueFrom,Observable } from 'rxjs'
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientSerice:HttpClientService) { }


  async getAuthorizeDefinitionEndpoints(){
    const observable : Observable<Menu[]> = await this.httpClientSerice.get<Menu[]>({
      controller:"ApplicationServices"
    });
    return firstValueFrom(observable);
  }
}
