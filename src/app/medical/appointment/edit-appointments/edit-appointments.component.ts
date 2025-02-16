import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-appointments',
  templateUrl: './edit-appointments.component.html',
  styleUrls: ['./edit-appointments.component.scss']
})
export class EditAppointmentsComponent {
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
  text_no_disponibilidad='';
  appointment_id = '';
  appointment_selected: any;

  constructor(
    public appointmentService: AppointmentService,
    public activedRoute: ActivatedRoute

  ){

  }

  ngOnInit(): void{

    this.activedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.appointment_id = resp.id
    })

    this.appointmentService.listConfig().subscribe((resp:any) => {
      this.hours = resp.hours;
      this.specialities=resp.specialities;
      this.appointmentService.showAppointment(this.appointment_id).subscribe((resp:any) => {
        console.log(resp);
        this.appointment_selected = resp.appointment;
        // Datos del paciente
        this.name = this.appointment_selected.patient.name;
        this.surname= this.appointment_selected.patient.surname;
        this.mobile= this.appointment_selected.patient.mobile;
        this.n_document= this.appointment_selected.patient.n_document;
        this.name_companion= this.appointment_selected.patient.name_companion;
        this.surname_companion= this.appointment_selected.patient.surname_companion;

        this.date_appointment= new Date(this.appointment_selected.date_appointment).toISOString();

        this.specialitie_id= this.appointment_selected.specialitie_id;
        //this.selected_segment_hour= this.appointment_selected.selected_segment_hour;
        this.amount= this.appointment_selected.amount;
        this.hour = this.appointment_selected.segment_hour.format_segment.hour;
        //this.filtro();
      });
    })

  }

  save(){

    // eslint-disable-next-line no-debugger
    debugger

    this.text_validation = "";


    if(!this.date_appointment || !this.specialitie_id || !this.amount){
      this.text_validation = "TODOS LOS CAMPOS SON NECESARIOS (FECHA, HORA, ESPECIALIDAD Y EL TOTAL DE PAGOS)";
      return;
     }

     if (new Date(this.date_appointment).getTime() != new Date(this.appointment_selected.date_appointment).getTime()){
      if(!this.selected_segment_hour){
        this.text_validation = "SE NECESITA SELECCIONAR UN SEGMENTO";
       return;
       }
     }



    //  || !this.selected_segment_hour

    const data = {
        "doctor_id":  this.DOCTOR_SELECTED ? this.DOCTOR_SELECTED.doctor_id :  this.appointment_selected.doctor_id,
        "date_appointment": this.date_appointment,
        "specialitie_id": this.specialitie_id,
        "doctor_schedule_join_hour_id": this.selected_segment_hour ? this.selected_segment_hour.id : this.appointment_selected.doctor_schedule_join_hour_id,
        "amount": this.amount,
    }
    this.appointmentService.updateAppointment(this.appointment_id, data).subscribe((resp:any) =>{
      console.log(resp);
      if (resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = " LA CITA MEDICA SE ACTUALIZO CON ÉXITO ";
      }

    })

  }

  onDateChange($event:any){
    this.DOCTORS=[];
    this.selected_segment_hour = null;
    this.DOCTOR_SELECTED = null;


  }

  filtro(){
    this.text_no_disponibilidad="";
    const data = {
      date_appointment: this.date_appointment,
      hour: this.hour,
      specialitie_id: this.specialitie_id
    }
    this.appointmentService.listFilter(data).subscribe((resp:any) => {
      console.log(resp);
      this.DOCTORS = resp.doctors;
      if  (this.DOCTORS.length === 0){
        this.text_no_disponibilidad="NO HAY DOCTORES DISPONIBLES CON ESTA ESPECIALIDAD EN ESTE HORARIO";
      }


      // this.DOCTORS.forEach((doctor:any) => {
      //   if(doctor.doctor.id == this.appointment_selected.doctor_id){
      //     const INDEX = doctor.segments.findIndex((item:any) => item.id == this.appointment_selected.doctor_schedule_join_hour_id)
      //     if (INDEX != -1){
      //       this.showSegment(doctor);
      //     }
      //   }
      // });

    })
  }

  isDoctorSelected(DOCTOR:any){
    if(DOCTOR.doctor.id == this.appointment_selected.doctor_id){
          return true;
    }
    return false;
  }

  isSegmentSelected(SEGMENT:any){
    if(SEGMENT.id == this.appointment_selected.doctor_schedule_join_hour_id){
          return true;
    }
    return false;
  }



  countDisponibilidad(DOCTOR:any){
    let SEGMENTS = [];
    SEGMENTS = DOCTOR.segments.filter((item:any) => !item.is_appointment)
    return SEGMENTS.length;
  }

  showSegment(DOCTOR: any) {

    this.DOCTOR_SELECTED = DOCTOR;
    //console.log(DOCTOR_SELECTED)

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
