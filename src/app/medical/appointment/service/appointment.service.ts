import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }



  listAppointments(page=1, search='', searchPatient = '', specialitie_id='', date:null){

    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let LINK = '';
   if(search){
     LINK+="&search="+search;
   }

   if(searchPatient){
    LINK+="&searchPatient="+searchPatient;
   }
       
   if(specialitie_id){
     LINK+="&specialitie_id="+specialitie_id;
   }
   if(date){
     LINK+="&date="+date;
   }
    const URL = URL_SERVICIOS+"/appointment?page="+page+LINK;
    console.log("MANDANDO AL ENDPOINT: " + URL);
    return this.http.get(URL, {headers: headers})
  }

  listConfig(){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment/config";
    return this.http.get(URL, {headers: headers})
  }

  listPatient(n_document=''){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment/patient?n_document="+ n_document;
    console.log("listPatient: "+ URL)
    return this.http.get(URL, {headers: headers})
  }

  registerAppointment(data:unknown){
    console.log("Data: " + data)
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment";
    return this.http.post(URL, data,  {headers: headers})
  }

  listFilter(data:unknown){
    console.log("Data: " + data)
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment/filter";
    return this.http.post(URL, data,  {headers: headers})
  }

  showAppointment(appointment_id:string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment/"+appointment_id;
    return this.http.get(URL, {headers: headers})
  }

  updateAppointment(appointment_id:string, data:unknown){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment/"+appointment_id;
    return this.http.put(URL, data, {headers: headers})

  }

  deleteAppointment(appointment_id:string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment/"+appointment_id;
    return this.http.delete(URL, {headers: headers})
  }

  //
  registerAttention(data:unknown){
    console.log("Data: " + data)
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment-attention";
    return this.http.post(URL, data,  {headers: headers})
  }

  showAppointmentAttention(appointment_id:string){
    const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/appointment-attention/"+appointment_id;
    return this.http.get(URL, {headers: headers})
  }

  sendPdf(pdfFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('pdf', pdfFile, pdfFile.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(URL_SERVICIOS+ '/upload-pdf', formData, { headers });
  }

}
