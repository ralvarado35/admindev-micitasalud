import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PatientMService } from '../service/patient-m.service';

@Component({
  selector: 'app-patient-m-profile',
  templateUrl: './patient-m-profile.component.html',
  styleUrls: ['./patient-m-profile.component.scss']
})
export class PatientMProfileComponent implements OnInit {
  patientProfile:any = [];
  option_selected =1;

  name ='';
  surname ='';
  mobile ='';
  email ='';
  address ='';
  password ='';
  password_confirmation ='';

  patient_id='';
  num_appointments=0;
  money_of_appointments=0;
  num_appointment_pendings=0;
  patient_selected: any;
  appointment_pending:any = [];
  appointments:any = [];

  text_validation = '';
  text_success  = '';

  constructor(
    public patientService: PatientMService,
    public activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.patient_id = resp.id;
    })
    this.patientService.profilePatient(this.patient_id).subscribe((resp:any) => {
      console.log(resp)
      this.num_appointments = resp.num_appointments
      this.money_of_appointments = resp.money_of_appointments
      this.num_appointment_pendings = resp.num_appointment_pendings
      this.patient_selected = resp.patient
      this.appointment_pending = resp.appointment_pending.data
      this.appointments = resp.appointments
    })
  }

  optionSelected(value:number){
    this.option_selected = value;
    console.log(this.option_selected)
  }

  update(){

  }





}
