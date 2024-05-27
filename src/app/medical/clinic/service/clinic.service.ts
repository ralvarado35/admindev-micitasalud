import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) { }

  listClinics(){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/clinics";
    return this.http.get(URL, {headers: headers})
  }

  registerClinic(data: any){
    console.log(data)
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/clinics";
    return this.http.post(URL, data, {headers: headers});

  }


  show(clinic_id:string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/clinics/"+clinic_id;
    return this.http.get(URL,{headers: headers});
  }

 update( clinic_id:any, data:any){
    console.log(data)
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/clinics/"+clinic_id;
    return this.http.put(URL,data,{headers: headers});
  }

  deleteClinic(clinic_id:string){
    console.log(clinic_id);
  }
}
