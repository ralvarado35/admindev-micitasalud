import { appointmentList } from './../../../shared/models/models';
import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { ActivatedRoute } from '@angular/router';
import  pdfMake from  'pdfmake/build/pdfMake'
import  pdfFonts from  'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-atencion-medical',
  templateUrl: './atencion-medical.component.html',
  styleUrls: ['./atencion-medical.component.scss']
})


export class AtencionMedicalComponent {

  name='';
  surname='';
  fullname = '';
  mobile='';
  n_document='';
  name_companion='';
  surname_companion='';
  doctor_name = '';
  created_at='';

  text_success='';
  text_validation='';

  appointment_id = '';
  appointment_selected: any;
  appointment_attention_selected: any;

  description='';
  name_medical: any;
  treatment:'';
  consult:'';
  uso: any;

  public IMAGEN_LOGO: any = 'assets/img/login-logo.png';

  public medical:any = [];
  medicalData: any[][] = []




  constructor(
    public appointmentService: AppointmentService,
    public activedRoute: ActivatedRoute,

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
      this.fullname= this.appointment_selected.patient.full_name;      
      this.mobile= this.appointment_selected.patient.mobile;
      this.n_document= this.appointment_selected.patient.n_document;
      this.name_companion= this.appointment_selected.patient.name_companion;
      this.surname_companion= this.appointment_selected.patient.surname_companion;
      this.surname_companion= this.appointment_selected.patient.surname_companion;
      this.consult = resp.appointment.consult;
      this.doctor_name = resp.appointment.doctor.full_name
      this.created_at = resp.appointment.created_at
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


  async imprimir(){

    if (!this.description || this.medical.length == 0){
      this.text_validation = "ES NECESARIO INGRESAR EL DIAGNÓSTICO Y UNA RECETA MÉDICA"
      return;
    }

    console.log(this.medical);
    //const medicalDataArray:any=[];
    this.medicalData.push(
      ['Medicamento', 'Uso'])

      this.medical.forEach(item => {
        this.medicalData.push(
           [item.name_medical,item.uso]
        )
      })

      console.log("Medical data: " + this.medicalData)
    //  this.medical.forEach(item => {

    //   this.medicalData.push(this.medical.map(
    //         item => [item.name_medical]
    //         ));
    //  });
    //console.log("medicalData " + medicalDataArray)


    const pdfDefinition: any = {

        // a string or { width: number, height: number }
        pageSize: 'A4',

        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'portrait',

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 40, 60, 40, 60 ],

        content: [
          {
            image: await this.getBase64ImageFromURL("../../assets/img/login-logo.png"),
            width: 100
          },
          '\n',
          {text: 'RECETA MEDICA', style: 'header'},
          '\n\n',
          {text: 'Fecha: ' + this.created_at},
          '\n',          
          {text: 'Nombre Paciente: ' + this.fullname},
          '\n',
          {text: 'No. Documento: ' + this.n_document},
          '\n',
          {text: 'Teléfono: ' + this.mobile},
          '\n',
          {text: 'Diagnóstico: ' +  this.description},
          '\n',         
          '\n',
          {text: 'Medicamentos', style: 'subheader'},
          '\n',
          {
            style: 'tableExample',
            table: {
              widths: [200, 200],
              body: this.medicalData
            }
          },
          '\n',
          '\n',
          '\n',
          '\n',
          '\n',
          '\n',          
          '\n',
          '\n',
          '-------------------------------',
          'DR.: ' + this.doctor_name,

        ],
        

        styles: {
          header: {
            fontSize: 16,
            bold: true,
            margin: [90, 0, 0, 0],            
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        },
        defaultStyle: {
          // alignment: 'justify'
        }
    }
    const pdf = pdfMake.createPdf(pdfDefinition)
          pdf.open();
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });}

}
