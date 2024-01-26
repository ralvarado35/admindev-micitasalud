import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { RolesService } from '../service/roles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-role-user',
  templateUrl: './edit-role-user.component.html',
  styleUrls: ['./edit-role-user.component.scss']
})

export class EditRoleUserComponent {

  sideBar: any = [];
  name: string  = '';
  permissions:any = [];
  valid_form: boolean = false;
  valid_form_success: boolean = false;
  text_validation:any = null;
  role_id: any

  constructor(
    public dataService: DataService,
    public roleService: RolesService,
    public activatedRoute: ActivatedRoute
  ){ }

  ngOnInit(): void {
    this.sideBar = this.dataService.sideBar[0].menu;
    this.activatedRoute.params.subscribe((resp:any) => {
      this.role_id = resp.id
    })
    this.showRole();
  }

  showRole(){
    this.roleService.showRoles(this.role_id).subscribe((resp:any)=>{
      console.log(resp);
      this.name = resp.name
      this.permissions =resp.permision_pluck
    })
  }

  addPermission(subMenu:any){
    if (subMenu.permision){
      const INDEX = this.permissions.findIndex((item: any) => item == subMenu.permision);
      if(INDEX != -1){
        this.permissions.splice(INDEX, 1)
      }else{
        this.permissions.push(subMenu.permision);
      }
      console.log(this.permissions);
    }
  }

  save(){
    this.valid_form = false
    if (!this.name || this.permissions.length == 0) {
      this.valid_form = true;
      return
    }
    const data = {
      name: this.name,
      permisions: this.permissions
    }
    console.log("enviando");
    this.valid_form_success = false;
    this.text_validation = null;
    this.roleService.editRoles(data, this.role_id).subscribe((resp:any) =>{
      console.log(resp);
      if (resp.message === 403){
        this.text_validation = resp.message_text;
        return
      } else {
        this.valid_form_success = true;
        const SIDE_BAR = this.sideBar;
        this.sideBar = [];
        setTimeout(() => {
          this.sideBar = SIDE_BAR;
        }, 50);
      }
    })
  }
}
