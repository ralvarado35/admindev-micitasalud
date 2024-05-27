import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public routes = routes;
  public openBox = false;
  public miniSidebar  = false;
  public addClass = false;
  public user:any;
  public IMAGEN_PREVISUALIZA: any = 'assets/img/user-06.jpg';

  constructor(
    public router: Router,
    private sideBar: SideBarService,
     public auth:AuthService) {

      this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    const USER = localStorage.getItem("user")
    this.user = JSON.parse(USER ? USER: '');
    console.log(this.user)
   // localStorage.setItem('clinic_id', this.user.clinic_id)

    if (this.user.avatar){
      this.IMAGEN_PREVISUALIZA = this.user.avatar
    } else{
      this.IMAGEN_PREVISUALIZA = 'assets/img/user-06.jpg'
    }
  }

  isPermited(){
    let band = false;
    this.user.roles.forEach((rol:any) => {
      if ((rol).toUpperCase().indexOf("DOCTOR") != -1){
        band= true;
      }
    });
    return band;
  }


  isPermision(permission=''){
    if (this.user.roles.includes('Super-Admin')){
      return true;
    }
    if (this.user.permissions.includes(permission)){
      return true;
    }
    return false;
  }

  getRole(){
    let RoleName = "";
    this.user.roles.forEach((rol:any) => {
      RoleName = rol
    });
    return RoleName;


  }

  openBoxFunc() {
    this.openBox = !this.openBox;
    /* eslint no-var: off */
    var mainWrapper = document.getElementsByClassName('main-wrapper')[0];
    if (this.openBox) {
      mainWrapper.classList.add('open-msg-box');
    } else {
      mainWrapper.classList.remove('open-msg-box');
    }
  }

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();

      this.addClass = !this.addClass;
      /* eslint no-var: off */
      var root = document.getElementsByTagName( 'html' )[0];
      /* eslint no-var: off */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var sidebar:any = document.getElementById('sidebar')

      if (this.addClass) {
        root.classList.add('menu-opened');
        sidebar.classList.add('opened');
      }
      else {
        root.classList.remove('menu-opened');
        sidebar.classList.remove('opened');
      }
    }

    logout(){
      this.auth.logout();

    }
  }
