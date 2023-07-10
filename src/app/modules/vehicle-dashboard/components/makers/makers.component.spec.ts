import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleService } from '../../services/vehicle.service';
import { BehaviorSubject, of } from 'rxjs';
import {
  VehicleMakerResponse,
  VehicleModelResponse,
  VehicleTypeResponse,
} from 'src/app/core/interfaces/vehicle-interface';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MakersComponent } from './makers.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { FormsModule } from '@angular/forms';

fdescribe('MakersComponent', () => {
  let component: MakersComponent;
  let fixture: ComponentFixture<MakersComponent>;
  let mockVehicleService: any;
  let makerResponse: VehicleMakerResponse;
  let modelResponse: VehicleModelResponse;
  let vehicleResponse: VehicleTypeResponse;
  const mockWindowSizeSubject = new BehaviorSubject<{ height: number }>({
    height: 0,
  });

  beforeEach(async () => {
    makerResponse = {
      Count: 10814,
      Message: 'Response returned successfully',
      SearchCriteria: null,
      Results: [
        {
          Make_ID: 4877,
          Make_Name: '1/OFF KUSTOMS, LLC',
        },
        {
          Make_ID: 11257,
          Make_Name: '102 IRONWORKS, INC.',
        },
      ],
    };
    modelResponse = {
      Count: 1,
      Message: 'Response returned successfully',
      SearchCriteria: 'MakeId:11257',
      Results: [
        {
          Make_ID: 11257,
          Make_Name: '102 IRONWORKS, INC.',
          Model_ID: 29286,
          Model_Name: '102 IRONWORKS, INC.',
        },
      ],
    };
    vehicleResponse = {
      Count: 5,
      Message: 'Response returned successfully',
      SearchCriteria: 'Make ID: 460',
      Results: [
        {
          VehicleTypeId: 2,
          VehicleTypeName: 'Passenger Car',
        },
        {
          VehicleTypeId: 3,
          VehicleTypeName: 'Truck',
        },
      ],
    };
    mockVehicleService = jasmine.createSpyObj('VehicleService', [
      'getAllVehicleMakers',
      'getAllVehicleModelsByMakeID',
      'getAllVehicleTypesByMakeID',
      'updateCurrentWindowSize',
    ]);
    mockVehicleService.windowSizeSubject = mockWindowSizeSubject;

    await TestBed.configureTestingModule({
      declarations: [MakersComponent, SearchComponent],
      providers: [{ provide: VehicleService, useValue: mockVehicleService }],
      imports: [ScrollingModule, FormsModule],
    }).compileComponents();

    let mockVehicleServiceSpy =
      mockVehicleService.getAllVehicleMakers.and.returnValue(of(makerResponse));

    fixture = TestBed.createComponent(MakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and fetch vehicle maker data', () => {
    // Arrange
    const mockVehicleServiceSpy =
      mockVehicleService.getAllVehicleMakers.and.returnValue(of(makerResponse));

    // Assert
    expect(mockVehicleServiceSpy).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('should fetch vehicle model data on maker selection', () => {
    // Arrange
    const mockVehicleServiceSpy =
      mockVehicleService.getAllVehicleModelsByMakeID.and.returnValue(
        of(modelResponse)
      );
    mockVehicleService.getAllVehicleTypesByMakeID.and.returnValue(
      of(vehicleResponse)
    );
    let Make_ID = 11257;

    // Act
    component.makerCardClickEvent({
      Make_ID: Make_ID,
      Make_Name: '102 IRONWORKS, INC.',
    });

    // Assert
    expect(component.activeMaker).toEqual(Make_ID);
    expect(mockVehicleServiceSpy).toHaveBeenCalled();
  });

  it('should reset activeMaker property on close model container', () => {
    // Act
    component.closeModelContent();

    // Assert
    expect(component.activeMaker).toBeUndefined();
  });
});
