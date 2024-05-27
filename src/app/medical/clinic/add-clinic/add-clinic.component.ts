import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SettingMService } from '../../setting-m/service/setting-m.service';
import { ClinicService } from '../service/clinic.service';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent {


  clinic_id:any;
  name='';
  url='';
  logo='';
  address1='';
  address2='';
  city='';
  //
  text_validation='';
  text_success='';
  //
  LOGO_PREVISUALIZA:any
  FILE_LOGO:any;

constructor(
  public auth: AuthService,
  public clinicService: ClinicService
){

}



    save(){

      this.text_validation = '';

      if(!this.name || !this.url  ){
        this.text_validation = "EL CAMPO NOMBRE Y ALIAS SON OBLIGATORIOS";
        return;
      }

      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("url", this.url);
      formData.append("address1", this.address1);
      formData.append("address2", this.address2);
      formData.append("city", this.city);
      formData.append("logo", this.FILE_LOGO);

      this.clinicService.registerClinic(formData).subscribe((resp:any)=>{
          console.log(resp)
          if (resp.message === 403){
            this.text_validation = resp.message_text;
          }else{
            this.text_success = " Clinica ha sido creada correctamente";
          }
      })

     

      // const data = {
      //   name: this.name,
      //   url:this.url,
      //   logo:this.FILE_LOGO,
      //   address1:this.address1,
      //   address2:this.address2,
      //   city:this.city,
      // };






  }

    loadFile($event:any){
      // eslint-disable-next-line no-debugger
      //debugger
      if ($event.target.files[0].type.indexOf("image") < 0 ){
        // alert("SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN")
        this.text_validation = " SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN";
        return;
      }
      this.text_validation = "";
      this.FILE_LOGO = $event.target.files[0];
      console.log("Imagen: " + this.FILE_LOGO)
      const reader = new FileReader();
      reader.readAsDataURL(this.FILE_LOGO);
      console.log("Imagen 2 "  + reader)
      reader.onloadend= () => this.LOGO_PREVISUALIZA = reader.result

    }


}
