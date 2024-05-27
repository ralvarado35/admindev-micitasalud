/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user:any;
  clinic_name: any
  token:any;

  constructor(private router: Router, public http: HttpClient) {
    this.getLocalStorage();
  }

  getLocalStorage(){
    if (localStorage.getItem("token") && localStorage.getItem("user")){
      const USER = localStorage.getItem("user");
      this.user = JSON.parse(USER ? USER : '')
      this.token = localStorage.getItem('token')
    }else{
      this.user=null;
      this.token = null;
    }
  }

  registerUser(data:unknown){
    //console.log("Data: " + data)
    //const headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    const URL = URL_SERVICIOS+"/auth/register";
    return this.http.post(URL, data)

  }

  login (email: string,  password: string) {
    const URL = URL_SERVICIOS + "/auth/login";
    return this.http.post(URL, {email: email, password: password}).pipe(
      map((auth: any) => {
        console.log(auth)
        const result = this.saveLocalStorage(auth);
        return result;
      }),
      catchError((error:any) => {
        console.log(error);
        return of(undefined)
      })
    )
    ;
  }

  saveLocalStorage(auth:any){
    if(auth && auth.access_token){
      localStorage.setItem("token", auth.access_token);
      localStorage.setItem("user", JSON.stringify(auth.user))
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('clinic_id', auth.user.clinic_id )
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("clinic_id");
    this.router.navigate([routes.login]);
  }


}
