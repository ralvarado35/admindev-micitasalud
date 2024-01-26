import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-doctor-m-profile',
  templateUrl: './doctor-m-profile.component.html',
  styleUrls: ['./doctor-m-profile.component.scss']
})
export class DoctorMProfileComponent implements OnInit {
  doctorProfile:any = [];
  option_selected =1;

  doctor_id='';

  name = '';
  surname = '';
  mobile = '';
  email = '';
  address = '';
  password = '';
  password_confirmation = '';

  num_appointments=0;
  money_of_appointments=0;
  num_appointment_pendings=0;
  doctor_selected: any;
  appointment_pending:any = [];
  appointments:any = [];

  text_validation = '';
  text_success  = '';

  constructor(
    public doctorService: DoctorService,
    public activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.doctor_id = resp.id;
    })
    this.doctorService.profileDoctor(this.doctor_id).subscribe((resp:any) => {
      console.log(resp)
      this.num_appointments = resp.num_appointments
      this.money_of_appointments = resp.money_of_appointments
      this.num_appointment_pendings = resp.num_appointment_pendings

      this.doctor_selected = resp.doctor
      this.appointment_pending = resp.appointment_pending.data
      this.appointments = resp.appointments

      this.name = this.doctor_selected.name
      this.surname = this.doctor_selected.surname
      this.mobile = this.doctor_selected.mobile
      this.email = this.doctor_selected.email
      this.address = this.doctor_selected.address


    })
  }

  optionSelected(value:number){
    this.option_selected = value;
  }

  update(){
    this.text_validation = '';
    this.text_success = '';
    if (!this.name ||!this.email ||!this.surname) {
      this.text_validation =
        ' LOS CAMPOS SON NECESARIOS (name, surname, email)';
      return;
    }

    if (this.password || this.password_confirmation ){
      if (this.password != this.password_confirmation) {
        this.text_validation = 'Las contraseñas deben ser iguales';
        return;
      }
    }

    const data: any = {
      name: this.name,
      surname  :this.surname,
      mobile :this.mobile,
      email :this.email,
      address :this.address,
    }

    if (this.password){
      data.password = this.password ? this.password: ''
    }

    this.doctorService.updateDoctorProfile(this.doctor_id, data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message === 403) {
        this.text_validation = resp.message_text;
      } else {
        this.text_success = ' El doctor ha sido actualizado correctamente';


      }
    });

  }



}
