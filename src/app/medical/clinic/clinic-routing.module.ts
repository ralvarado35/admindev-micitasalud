import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { ListClinicComponent } from './list-clinic/list-clinic.component';
import { EditClinicComponent } from './edit-clinic/edit-clinic.component';

const routes: Routes = [{
  path: '',
  component: ClinicComponent,
  children: [
    {
      path: 'add-clinic',
      component: AddClinicComponent
    },

    {
      path: 'list-clinic',
      component: ListClinicComponent
    },

    {
      path: 'list-clinic/edit-clinic/:id',
      component: EditClinicComponent
    },


  ]
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
