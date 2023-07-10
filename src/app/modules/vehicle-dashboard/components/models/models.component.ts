import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  map,
  shareReplay,
  takeUntil,
} from 'rxjs';
import {
  ModelData,
  VehicleModelResponse,
  VehicleTypeData,
  VehicleTypeResponse,
} from 'src/app/core/interfaces/vehicle-interface';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent implements OnInit, OnDestroy {
  vehicleModels$!: Observable<ModelData[]>;
  vehicleTypes$!: Observable<VehicleTypeData[]>;
  @Input() makeName: string | undefined;
  @Input() makeId: number | undefined;
  @Output() closeModelContent = new EventEmitter<any>();
  windowHeight: number = window.innerHeight;
  allSubscription: Subscription[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private _vehicleService: VehicleService) {}
  ngOnInit() {
    // Todo: remove below duplicate code and fetch from makers
    this.allSubscription.push(
      // Subscribe to the service subject to fetch the current window size to calculate the height for virtual scroll div
      this._vehicleService.windowSizeSubject.subscribe(
        (windowSize: { height: number }) => {
          this.windowHeight = windowSize.height;
        }
      )
    );
    if (this.makeId) {
      this.getAllVehicleModelsByMakeID(this.makeId);
      this.getAllVehicleTypesByMakeID(this.makeId);
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['makeId'] && this.makeId) {
      this.getAllVehicleModelsByMakeID(this.makeId);
      this.getAllVehicleTypesByMakeID(this.makeId);
    }
  }

  // Emit event on close icon click to close vehicle details content (Models and Vehicle types)
  closeModels() {
    this.closeModelContent?.emit();
  }

  ngOnDestroy() {
    // Unsubscribing all component level subscriptions to avoid memory leak
    this.allSubscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Method to get all vehicle models from service for a specific Make_ID
  getAllVehicleModelsByMakeID(Make_ID: number) {
    this.vehicleModels$ = this._vehicleService
      .getAllVehicleModelsByMakeID(Make_ID)
      .pipe(
        takeUntil(this.unsubscribe$),
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
        takeUntil(this.unsubscribe$),
        map((response: VehicleTypeResponse) => {
          return response.Results;
        })
      );
    return this.vehicleTypes$;
  }
}
