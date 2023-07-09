import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleDashboardComponent } from './vehicle-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleDashboardComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleDashboardRoutingModule { }
