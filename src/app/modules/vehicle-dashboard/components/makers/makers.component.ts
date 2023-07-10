import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Observable, Subject, Subscription, map, of, shareReplay } from 'rxjs';
import {
  MakerData,
  ModelData,
  VehicleMakerResponse,
  VehicleTypeData,
} from 'src/app/core/interfaces/vehicle-interface';
import { takeUntil } from 'rxjs/operators';

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
  private unsubscribe$ = new Subject<void>();

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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Method to get all vehicle makers from service
  getAllVehicleMakers() {
    this.vehicles$ = this._vehicleService.getAllVehicleMakers().pipe(
      takeUntil(this.unsubscribe$),
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
