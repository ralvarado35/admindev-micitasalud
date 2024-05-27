import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/medical/staff/service/staff.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public routes = routes;
  public CustomControler!: number | string | boolean ;
  public passwordClass  = false;
  public confirmPasswordClass  = false
  public isValidConfirmPassword = false;
  public existEmail = false;

  name: any;
  surname: any;
  name_clinic: any
  email: any;
  password: any;
  confirmPassword: any;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required]),
    name_clinic: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });



  get f() {
    return this.form.controls;
  }

  constructor(
    private router:Router,
    private auth: AuthService,
    private staffService: StaffService) { }


  submit() {
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isValidConfirmPassword = true;
      console.log(this.isValidConfirmPassword)
      //console.log("Enviado formulario password no son iguales")
    } else {
      this.isValidConfirmPassword = false;
      this.auth.login(this.form.value.email ? this.form.value.email: '',  this.form.value.password ? this.form.value.password: '');
      console.log(this.form.value)

      this.auth.registerUser(this.form.value).subscribe((resp:any)=>{
        console.log("Alguna respuesta: " + resp.message)
        if (resp.message==400) {
          console.log("Entro aqui: " + resp.ok)
          this.existEmail = true;

        }


      })

    }


  }
  passwordFunc(){
    this.passwordClass = !this.passwordClass
  }
  confirmPasswordFunc(){
    this.confirmPasswordClass = !this.confirmPasswordClass
  }
}
