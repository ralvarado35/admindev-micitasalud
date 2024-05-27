import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingMService {

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) { }

  show(clinic_id:string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/clinic/"+clinic_id;
    return this.http.get(URL,{headers: headers});
  }

 update( clinic_id:any, data:any){
    console.log(data)
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/clinic/"+clinic_id;
    return this.http.put(URL,data,{headers: headers});
  }

}
