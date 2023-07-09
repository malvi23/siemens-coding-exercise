import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environemnt } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { API_LIST, CATEGORIES } from '../../../shared/api-urls';
import {
  VehicleMakerResponse,
  VehicleModelResponse,
  VehicleTypeResponse,
} from 'src/app/core/interfaces/vehicle-interface';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  API_URL = environemnt.API_BASE_URL;
  API_URL_CATEGORY = CATEGORIES.vehicles;
  API_OBJECT = _.find(API_LIST, ['category', this.API_URL_CATEGORY]);
  VEHICLE_APIS = this.API_OBJECT?.list;
  API_POSTFIX = '?format=json';

  windowSizeSubject: BehaviorSubject<{ height: number }> = new BehaviorSubject<{
    height: number;
  }>({ height: window.innerHeight });

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCurrentWindowSize();
  }

  constructor(private http: HttpClient) {}

  // API provides all the Vehicle Makers
  getAllVehicleMakers(): Observable<VehicleMakerResponse> {
    return this.http.get<VehicleMakerResponse>(
      `${this.API_URL}${this.API_URL_CATEGORY}${this.VEHICLE_APIS?.getAllVehicleMakers}${this.API_POSTFIX}`
    );
  }

  // API provides the Vehicle Models for a specific Make_ID
  getAllVehicleModelsByMakeID(
    Make_ID: number
  ): Observable<VehicleModelResponse> {
    return this.http.get<VehicleModelResponse>(
      `${this.API_URL}${this.API_URL_CATEGORY}${this.VEHICLE_APIS?.getAllVehicleModelsByMakeID}/${Make_ID}${this.API_POSTFIX}`
    );
  }

  // API provides the Vehicle Models for a specific Make_ID
  getAllVehicleTypesByMakeID(Make_ID: number): Observable<VehicleTypeResponse> {
    return this.http.get<VehicleTypeResponse>(
      `${this.API_URL}${this.API_URL_CATEGORY}${this.VEHICLE_APIS?.getAllVehicleTypesByMakeID}/${Make_ID}${this.API_POSTFIX}`
    );
  }

  // Emit window size on update of current window resolution
  updateCurrentWindowSize() {
    this.windowSizeSubject.next({ height: window.innerHeight });
  }
}
