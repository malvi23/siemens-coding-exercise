import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'vehicle-dashboard',
    loadChildren: () => import('./modules/vehicle-dashboard/vehicle-dashboard.module').then(m => m.VehicleDashboardModule)
  },{
    path: 'login',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    redirectTo: '/vehicle-dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/vehicle-dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
