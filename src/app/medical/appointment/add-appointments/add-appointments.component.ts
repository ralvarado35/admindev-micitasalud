import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent implements OnInit{

  public hour:any = [];
  public specialities:any = [];
  public date_appointment:any;
  public hours:any;
  public specialitie_id:any;

  public name='';
  public surname='';
  public mobile='';
  public n_document='';
  public name_companion='';
  public surname_companion='';
  public amount=0;
  public amount_add=0;
  public method_payment='';

  public DOCTORS: any = [];
  public DOCTOR_SELECTED:any;
  public selected_segment_hour:any;
  public text_success='';
  public text_validation='';

  constructor(
    public appointmentService: AppointmentService

  ){

  }

  ngOnInit(): void{
    this.appointmentService.listConfig().subscribe((resp:any) => {
      console.log(resp)
      this.specialities=resp.specialities
      this.hours=resp.hours
    })

  }

  save(){


    this.text_validation = "";

    if (!this.date_appointment || !this.hour || !this.specialitie_id){
      this.text_validation = "SE DEBE SELECCIONAR UNA FECHA, HORA Y ESPECIALIDAD PARA AGREGAR UNA CITA";
      console.log(this.text_validation)
      return;
    }

    if(!this.selected_segment_hour){
      this.text_validation = "DEBE SELECCIONAR EL DOCTOR Y LA HORA DISPONIBLE DE CONSULTA";
      console.log(this.text_validation)
      return;
    }

    if(!this.name || !this.surname){
      this.text_validation = "INGRESE EL NOMBRE Y APELLIDO DEL PACIENTE";
      console.log(this.text_validation)
      return;
    }

    if(!this.n_document){
      this.text_validation = " FALTAN EL No. DOCUMENTO";
      console.log(this.text_validation)
      return;
    }

    if(!this.mobile) {
      this.text_validation = " FALTAN EL NO. TELEFONO";
      console.log(this.text_validation)
      return;
    }

    if(!this.amount || this.amount < 0 ) {
      this.text_validation = " DEBE INGRESAR EL COSTO DE LA CONSULTA";
      console.log(this.text_validation)
      return;
    }

    const data = {
        "doctor_id":  this.DOCTOR_SELECTED.doctor.id,

        "name": this.name,
        "surname": this.surname,
        "mobile": this.mobile,
        "n_document": this.n_document,
        "name_companion": this.name_companion,
        "surname_companion": this.surname_companion,
        "date_appointment": this.date_appointment,
        "specialitie_id": this.specialitie_id,
        "doctor_schedule_join_hour_id":  this.selected_segment_hour.id,
         "amount": this.amount,
        // "amount_add": this.amount_add,
        // "method_payment": this.method_payment
    }
    this.appointmentService.registerAppointment(data).subscribe((resp:any) =>{
      console.log(resp);
      this.text_success = " LA CITA MEDICA SE REGISTRO CON ÉXITO ";

    })

  }

  filtro(){
    const data = {
      date_appointment: this.date_appointment,
      hour: this.hour,
      specialitie_id: this.specialitie_id
    }
    this.appointmentService.listFilter(data).subscribe((resp:any) => {
      console.log(resp);
      this.DOCTORS = resp.doctors;
    })
  }

  countDisponibilidad(DOCTOR:any){
    let SEGMENTS = [];
    SEGMENTS = DOCTOR.segments.filter((item:any) => !item.is_appointment)
    return SEGMENTS.length;
  }

  showSegment(DOCTOR:any){
     this.DOCTOR_SELECTED = DOCTOR;
     console.log(this.DOCTOR_SELECTED);


  }

  selectSegment(SEGMENT:any){
    this.selected_segment_hour = SEGMENT

  }

  filterPatient(){
    this.appointmentService.listPatient(this.n_document).subscribe((resp:any)=> {
      console.log(resp);
      if(resp.message == 403) {
        this.resetPatient();
      } else {
         this.name = resp.name
         this.surname= resp.surname
         this.mobile= resp.mobile
         this.n_document= resp.n_document
      }
    })
  }

  resetPatient(){
    this.name = ''
    this.surname= ''
    this.mobile= ''
    this.n_document= ''

  }


}

