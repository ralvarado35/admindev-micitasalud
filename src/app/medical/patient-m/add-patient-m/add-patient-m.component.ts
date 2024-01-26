import { Component } from '@angular/core';
import { PatientMService } from '../service/patient-m.service';

@Component({
  selector: 'app-add-patient-m',
  templateUrl: './add-patient-m.component.html',
  styleUrls: ['./add-patient-m.component.scss']
})

export class AddPatientMComponent {

  public selectedValue !: string;
  public name = '';
  public surname = '';
  public mobile = '';
  public email = '';
  public birth_date = '';
  public gender = 1;
  public education = '';
  public address = '';

  public antecedent_personal ='';
  public antecedent_family ='';
  public antecedent_allergic ='';

  public name_companion='';
  public surname_companion='';
  public mobile_companion='';
  public relationship_companion='';

  public name_responsible = '';
  public surname_responsible = '';
  public mobile_responsible = '';
  public relationship_responsible = '';

  public current_disease='';

  public ta=0;
  public temperatura=0;
  public fc=0;
  public fr=0;
  public peso=0;

  public n_document='';


  public roles:any = [];
  public FILE_AVATAR:any;
  public IMAGEN_PREVISUALIZA:any = 'assets/img/user-06.jpg';

  public text_success = '';
  public text_validation = '';


   constructor (
     public patientService: PatientMService,
     ) { }


    save(){
      this.text_validation = '';

      if(!this.name || !this.surname || !this.n_document || !this.mobile ){
        this.text_validation = " ESTOS CAMPOS SON OBLIGATORIOS (Nombre, Apellido, No. Documento, Teléfono)";
        return;
      }

      if (!this.ta || !this.temperatura || !this.fc || !this.fr || !this.peso){
      this.text_validation = " LOS SIGNOS VITALES SON OBLIGATORIOS";
      return;
      }


    //  if(!this.name_companion || !this.surname_companion){
    //   this.text_validation = "NOMBRE Y APELLIDO DEL ACOMPA (nombre, apellido, numero documento)";
    //   return;
    // }

      console.log(this.selectedValue);

      const formData = new FormData();
      formData.append("name", this.name)
      formData.append("surname", this.surname)
      if (this.email){
        formData.append("email", this.email);
      }
      formData.append("mobile", this.mobile)
      formData.append("n_document", this.n_document)
      if (this.birth_date){
        formData.append("birth_date", this.birth_date);
      }
      formData.append("gender", this.gender+"")

      if (this.education){
        formData.append("education", this.education)
      }
      if (this.address){
        formData.append("address", this.address)
      }
      if (this.FILE_AVATAR){
        formData.append("imagen", this.FILE_AVATAR);
      }

      if (this.antecedent_personal){
        formData.append("antecedent_personal",this.antecedent_personal);
      }

      if (this.antecedent_family){
        formData.append("antecedent_family",this.antecedent_family);
      }

      if (this.antecedent_allergic){
        formData.append("antecedent_allergic",this.antecedent_allergic);
      }

      if (this.name_companion){
        formData.append("name_companion",this.name_companion);
      }

      if (this.surname_companion){
        formData.append("surname_companion",this.surname_companion);
      }

      if (this.mobile_companion){
        formData.append("mobile_companion",this.mobile_companion);
      }

      if (this.relationship_companion){
        formData.append("relationship_companion",this.relationship_companion);
      }

      if (this.name_responsible){
        formData.append("name_responsible",this.name_responsible);
      }

      if (this.surname_responsible){
        formData.append("surname_responsible",this.surname_responsible);
      }
      if (this.mobile_responsible){
        formData.append("mobile_responsible",this.mobile_responsible);
      }

      if (this.relationship_responsible){
        formData.append("relationship_responsible",this.relationship_responsible);
      }

      if (this.current_disease){
        formData.append("current_disease",this.current_disease);
      }

      formData.append("ta",this.ta+"");
      formData.append("temperatura",this.temperatura+"");
      formData.append("fc",this.fc+"");
      formData.append("fr",this.fr+"");
      formData.append("peso",this.peso+"");


      this.patientService.registerPatient(formData).subscribe((resp:any)=>{
        console.log(resp)
        if (resp.message === 403){
          this.text_validation = resp.message_text;
        }else{
          this.text_success = " El paciente ha sido registrado correctamente";

          this.name = ''
          this.surname= '';
          this.email= '';
          this.mobile= '';
          this.birth_date= '';
          this.gender= 1;
          this.education= '';


          this.n_document= ''
          this.antecedent_personal= ''
          this.antecedent_family= ''
          this.antecedent_allergic= ''
          this.name_companion= ''
          this.surname_companion= ''
          this.mobile_companion= ''
          this.antecedent_allergic= ''
          this.name_responsible= ''
          this.surname_responsible= ''
          this.name_responsible= ''
          this.surname_responsible= ''
          this.current_disease= ''
          this.ta=0;
          this.temperatura=0;
          this.fc=0;
          this.fr=0;
          this.peso=0;
          this.address= '';
          this.selectedValue= '';
          this.FILE_AVATAR= null;
          this.IMAGEN_PREVISUALIZA=null
        }
      })

    }

    loadFile($event:any){
      if ($event.target.files[0].type.indexOf("image") < 0 ){
        // alert("SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN")
        this.text_validation = " SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN";
        return;
      }
      this.text_validation = "";
      this.FILE_AVATAR = $event.target.files[0];
      console.log("Imagen: " + this.FILE_AVATAR)
      const reader = new FileReader();
      reader.readAsDataURL(this.FILE_AVATAR);
      console.log("Imagen 2 "  + reader)
      reader.onloadend= () => this.IMAGEN_PREVISUALIZA = reader.result


    }


}
