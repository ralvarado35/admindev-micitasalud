import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingMRoutingModule } from './setting-m-routing.module';
import { SettingMComponent } from './setting-m.component';
import { AddSettingComponent } from './add-setting/add-setting.component';
import { EditSettingComponent } from './edit-setting/edit-setting.component';
import { ListSettingComponent } from './list-setting/list-setting.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SettingMComponent,
    AddSettingComponent,
    EditSettingComponent,
    ListSettingComponent
  ],
  imports: [
    CommonModule,
    SettingMRoutingModule,
     //
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     RouterModule
  ]
})
export class SettingMModule { }
