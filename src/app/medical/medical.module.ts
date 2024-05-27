import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoutingModule } from './medical-routing.module';
import { MedicalComponent } from './medical.component';
import { SharedModule } from '../shared/shared.module';
import { PdfComponent } from './pdf/pdf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgxMaskModule } from 'ngx-mask';
// import { HeaderComponent } from '../common-component/header/header.component';
// import { SidebarComponent } from '../common-component/sidebar/sidebar.component';


@NgModule({
  declarations: [
    MedicalComponent,
    PdfComponent,
    // HeaderComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule,
    MedicalRoutingModule,
    SharedModule,
    FormsModule,
    //NgxMaskModule.forRoot(),
    //ReactiveFormsModule
  ]
})
export class MedicalModule { }
