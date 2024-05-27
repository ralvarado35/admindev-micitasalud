import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { SettingMService } from '../service/setting-m.service';
interface data {
  value: string ;
}
@Component({
  selector: 'app-list-setting',
  templateUrl: './list-setting.component.html',
  styleUrls: ['./list-setting.component.scss']
})
export class ListSettingComponent implements OnInit {
  
  public routes = routes;
  public deleteIcon1 = true;
  public deleteIcon2  = true;
  public selectedValue! : string ;

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
  public settingService: SettingMService
){

}

  ngOnInit(){
    this.clinic_id = localStorage.getItem("clinic_id");

    this.settingService.show(this.clinic_id).subscribe((resp:any) =>{
      console.log(resp)
        this.name=resp.name;
        this.url = resp.url;
        this.logo=resp.logo;
        this.address1=resp.address1;
        this.address2=resp.address2;
        this.city=resp.city;
    })
  }

    save(){
      this.text_validation = '';

      if(!this.url  ){
        this.text_validation = "El CAMPO URL ES OBLIGATORIO";
        return;
      }

      const data = {
        name: this.name,
        url:this.url,
        logo:this.FILE_LOGO,
        address1:this.address1,
        address2:this.address2,
        city:this.city,
      };

      // const data = new FormData();

      // data.append("name", this.name)
      // data.append("url", this.url)
      // if(this.logo){
      //   data.append("logo", this.FILE_LOGO)
      // }
      // data.append("address1", this.address1)
      // data.append("address2", this.address2)
      // data.append("city", this.city)



      this.settingService.update(this.clinic_id, data).subscribe((resp:any)=>{
          console.log(resp)
          if (resp.message === 403){
            this.text_validation = resp.message_text;
          }else{
            this.text_success = " Clinica ha sido actualizado correctamente";
          }

      })

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
