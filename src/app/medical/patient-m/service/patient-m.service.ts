import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientMService {


  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listPatients(page: string | number, search: string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/patients/?page="+page+"&search="+search
    return this.http.get(URL, {headers: headers})
  }

  listConfig(){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/patients/config";
    return this.http.get(URL, {headers: headers})
  }

  registerPatient(data:unknown){
    console.log("Data: " + data)
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/patients";
    return this.http.post(URL, data,  {headers: headers})

  }

  showPatient(patient_id:string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/patients/"+patient_id;
    return this.http.get(URL, {headers: headers})
  }

  updatePatient(patient_id:string, data:any){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/patients/"+patient_id;
    return this.http.post(URL, data, {headers: headers})

  }

  deletePatient(patient_id:string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/patients/"+patient_id;
    return this.http.delete(URL, {headers: headers})
  }

  profilePatient(patient_id:string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/patients/profile/"+patient_id;
    return this.http.get(URL, {headers: headers})
  }



}
