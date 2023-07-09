import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModelData, VehicleTypeData } from 'src/app/core/interfaces/vehicle-interface';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent implements OnInit, OnDestroy {
  @Input() vehicleModels$!: Observable<ModelData[]>;
  @Input() vehicleTypes$!: Observable<VehicleTypeData[]>;
  @Input() makeName:string | undefined;
  @Output() closeModelContent = new EventEmitter<any>();
  windowHeight: number = window.innerHeight;
  allSubscription: Subscription[]=[];

  constructor(private _vehicleService: VehicleService) { }
  ngOnInit() {
    // Todo: remove below duplicate code and fetch from makers
    this.allSubscription.push(
      // Subscribe to the service subject to fetch the current window size to calculate the height for virtual scroll div
      this._vehicleService.windowSizeSubject.subscribe((windowSize: { height: number }) => {
        this.windowHeight = windowSize.height
      })
    )
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
  }
}
