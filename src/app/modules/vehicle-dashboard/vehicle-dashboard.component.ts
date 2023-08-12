import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicle-dashboard',
  templateUrl: './vehicle-dashboard.component.html',
  styleUrls: ['./vehicle-dashboard.component.scss'],
})
export class VehicleDashboardComponent {
  totalMakers: number | undefined;
  updateTotal(totalMakers: number) {
    this.totalMakers = totalMakers;
  }
}
