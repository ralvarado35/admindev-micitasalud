import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicComponent } from './clinic.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { EditClinicComponent } from './edit-clinic/edit-clinic.component';
import { ListClinicComponent } from './list-clinic/list-clinic.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ClinicComponent,
    AddClinicComponent,
    EditClinicComponent,
    ListClinicComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
     //
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     RouterModule
  ]
})
export class ClinicModule { }
