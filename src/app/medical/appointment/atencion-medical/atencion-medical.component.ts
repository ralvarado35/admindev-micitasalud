import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atencion-medical',
  templateUrl: './atencion-medical.component.html',
  styleUrls: ['./atencion-medical.component.scss']
})
export class AtencionMedicalComponent {

  name='';
  surname='';
  mobile='';
  n_document='';
  name_companion='';
  surname_companion='';

  text_success='';
  text_validation='';

  appointment_id = '';
  appointment_selected: any;
  appointment_attention_selected: any;

  description='';
  name_medical: any;
  uso: any;

  public medical:any = [];


  constructor(
    public appointmentService: AppointmentService,
    public activedRoute: ActivatedRoute
  ){ }

  ngOnInit(): void{

    this.activedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.appointment_id = resp.id
    })


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
     })

     this.appointmentService.showAppointmentAttention(this.appointment_id).subscribe((resp:any) => {
            console.log(resp);
            this.appointment_attention_selected = resp.appointment_attention;
            this.medical = this.appointment_attention_selected.receta_medica;
            this.description= this.appointment_attention_selected.description;

     })
  }

  addMedicamento(){
    this.medical.push({
      name_medical: this.name_medical,
      uso: this.uso,
    })
    this.name_medical='';
    this.uso='';
  }

  deleteMedical(i:any){
    this.medical.splice(i,1);
  }

  save(){

    if (!this.description || this.medical.length == 0){
      this.text_validation = "ES NECESARIO INGRESAR EL DIAGNÓSTICO Y UNA RECETA MÉDICA"
      return;
    }

    const data =  {

      appointment_id: this.appointment_id,
      patient_id: this.appointment_selected.patient_id,
      description: this.description,
      medical: this.medical

    }

    this.appointmentService.registerAttention(data).subscribe((resp:any) =>{
      console.log(resp);
      this.text_success = "SE GUARDO LA INFORMACIÓN DE LA ATENCIÓN MÉDICA";
    });

  }

}
