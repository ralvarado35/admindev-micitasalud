import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';



@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent implements OnInit{

  //phoneForm?: FormGroup

  hour:any = [];
  specialities:any = [];
  date_appointment:any;
  hours:any;
  specialitie_id:any;

  name='';
  surname='';
  mobile='';

  n_document='';
  name_companion='';
  surname_companion='';
  amount=0;
  amount_add=0;
  method_payment='';

  DOCTORS: any = [];
  DOCTOR_SELECTED:any;
  selected_segment_hour:any;
  text_success='';
  text_validation='';
  text_no_disponibilidad = '';

  gender = 1;
  email = '';
  treatment = '';
  consult = '';
  FormBuilder: any;

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

    this.text_validation="";
    //alert(this.text_validation);



    if (!this.date_appointment || !this.hour || !this.specialitie_id){
      this.text_validation = "SE DEBE SELECCIONAR UNA FECHA, HORA Y ESPECIALIDAD PARA AGREGAR UNA CITA";
      console.log(this.text_validation)
      return;
    }

    if (!this.selected_segment_hour){
      this.text_validation = "DEBE SELECCIONAR EL DOCTOR Y LA HORA DISPONIBLE DE CONSULTA";
      console.log(this.text_validation)
      return;
    }

    if (!this.name || !this.surname || !this.n_document || !this.mobile ){
      this.text_validation = " NOMBRE, APELLIDO, TELEFONO, NO.DOCUMENTO (SON CAMPOS OBLIGATORIOS)";
      console.log(this.text_validation)
      return;
    }


    // if (!this.n_document || this.n_document == "") {

    //   this.text_validation = "FALTAN EL No. DOCUMENTO";
    //   console.log(this.text_validation)
    //   return;
    // }

    // if (!this.mobile || this.mobile === '') {
    //   this.text_validation = " FALTAN EL NO. TELEFONO";
    //   console.log(this.text_validation)
    //   return;
    // }


    // eslint-disable-next-line no-debugger
    debugger

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
        "gender" : this.gender,
        "email" : this.email,
        "consult" : this.consult
        // "amount_add": this.amount_add,
        // "method_payment": this.method_payment
    }
    console.log("Datos de pago: " + data)
    this.appointmentService.registerAppointment(data).subscribe((resp:any) =>{
      console.log(resp);
      this.text_success = " LA CITA MEDICA SE REGISTRO CON ÉXITO ";

    })

  }

  filtro(){
    this.text_validation="";

    if (!this.date_appointment || !this.hour || !this.specialitie_id) {
      this.text_validation = "SELECCIONE TODOS LOS PARAMETROS PARA AGREGAR LA CITA";
      this.DOCTOR_SELECTED = "";
      return;
    }

    const data = {
      date_appointment: this.date_appointment,
      hour: this.hour,
      specialitie_id: this.specialitie_id
    }
    this.appointmentService.listFilter(data).subscribe((resp:any) => {
      console.log(resp);
      this.DOCTORS = resp.doctors;
      if  (this.DOCTORS.length === 0){
        this.text_validation="NO HAY DOCTORES DISPONIBLES EN ESTA FECHA Y HORA PARA ESTA ESPECIALIDAD";
        this.DOCTOR_SELECTED = "";
      }
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
    console.log("No. de Documento: "  + this.n_document)
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

