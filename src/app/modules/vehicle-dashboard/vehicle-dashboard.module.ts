import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDashboardRoutingModule } from './vehicle-dashboard-routing.module';
import { VehicleDashboardComponent } from './vehicle-dashboard.component';
import { MakersComponent } from './components/makers/makers.component';
import { ModelsComponent } from './components/models/models.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VehicleDashboardComponent,
    MakersComponent,
    ModelsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    VehicleDashboardRoutingModule,
    ScrollingModule,
    FormsModule
  ]
})
export class VehicleDashboardModule { }
