import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingMComponent } from './setting-m.component';
import { AddSettingComponent } from './add-setting/add-setting.component';
import { ListSettingComponent } from './list-setting/list-setting.component';
import { EditSettingComponent } from './edit-setting/edit-setting.component';

const routes: Routes = [{

  path:'',
  component: SettingMComponent,
  children: [
    {
      path: 'add-setting',
      component: AddSettingComponent
    },
    {
      path: 'list-setting',
      component: ListSettingComponent
    },
    {
      path: 'edit-setting/:id',
      component: EditSettingComponent
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingMRoutingModule { }
