import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Observable, Subscription, map, of, shareReplay } from 'rxjs';
import {
  MakerData,
  ModelData,
  VehicleMakerResponse,
  VehicleModelResponse,
  VehicleTypeData,
  VehicleTypeResponse,
} from 'src/app/core/interfaces/vehicle-interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-makers',
  templateUrl: './makers.component.html',
  styleUrls: ['./makers.component.scss'],
})
export class MakersComponent implements OnInit, OnDestroy {
  vehicles$: Observable<MakerData[]> = of([]);
  vehicleModels$!: Observable<ModelData[]>;
  vehicleTypes$!: Observable<VehicleTypeData[]>;
  activeMaker: number | undefined;
  activeMakeName: string | undefined;
  windowHeight: number = window.innerHeight;
  allSubscription: Subscription[] = [];

  constructor(private _vehicleService: VehicleService) {}
  ngOnInit(): void {
    this.getAllVehicleMakers();

    this.allSubscription.push(
      // Subscribe to the service subject to fetch the current window size to calculate the height for virtual scroll div
      this._vehicleService.windowSizeSubject.subscribe(
        (windowSize: { height: number }) => {
          this.windowHeight = windowSize.height;
        }
      )
    );
  }

  ngOnDestroy() {
    // Unsubscribing all component level subscriptions to avoid memory leak
    this.allSubscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  // Method to get all vehicle makers from service
  getAllVehicleMakers() {
    this.vehicles$ = this._vehicleService.getAllVehicleMakers().pipe(
      map((response: VehicleMakerResponse) => {
        return response.Results;
      }),
      shareReplay()
    );
  }

  // Maker click event to fetch amd display more data (Models and Vehicle types)
  makerCardClickEvent(Vehicle: MakerData) {
    this.activeMaker = Vehicle.Make_ID;
    this.activeMakeName = Vehicle.Make_Name;
    this.getAllVehicleModelsByMakeID(Vehicle.Make_ID);
    this.getAllVehicleTypesByMakeID(Vehicle.Make_ID);
  }

  // Method to get all vehicle models from service for a specific Make_ID
  getAllVehicleModelsByMakeID(Make_ID: number) {
    this.vehicleModels$ = this._vehicleService
      .getAllVehicleModelsByMakeID(Make_ID)
      .pipe(
        map((response: VehicleModelResponse) => {
          return response.Results;
        }),
        shareReplay()
      );
  }

  // Method to get all vehicle types from service for a specific Make_ID
  getAllVehicleTypesByMakeID(Make_ID: number) {
    this.vehicleTypes$ = this._vehicleService
      .getAllVehicleTypesByMakeID(Make_ID)
      .pipe(
        map((response: VehicleTypeResponse) => {
          return response.Results;
        })
      );
    return this.vehicleTypes$;
  }

  // Close vehicle details content (Models and Vehicle types) on close icon click
  closeModelContent() {
    this.activeMaker = undefined;
  }

  // This method will be invoked when search component will emit filtered data based on search value
  showFilteredData(filteredList: MakerData[]) {
    this.vehicles$ = of(filteredList);
  }
}
