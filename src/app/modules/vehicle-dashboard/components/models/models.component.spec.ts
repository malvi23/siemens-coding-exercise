import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ModelsComponent } from './models.component';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { ModelData } from 'src/app/core/interfaces/vehicle-interface';
import { VehicleService } from '../../services/vehicle.service';
import { By } from '@angular/platform-browser';

fdescribe('ModelsComponent', () => {
  let component: ModelsComponent;
  let fixture: ComponentFixture<ModelsComponent>;
  let mockVehicleService: any;
  let modelResponse: ModelData[];
  const mockWindowSizeSubject = new BehaviorSubject<{ height: number }>({
    height: 0,
  });

  beforeEach(async () => {
    modelResponse = [
      {
        Make_ID: 460,
        Make_Name: 'Ford',
        Model_ID: 1778,
        Model_Name: 'Crown Victoria',
      },
      {
        Make_ID: 460,
        Make_Name: 'Ford',
        Model_ID: 1779,
        Model_Name: 'Focus',
      },
      {
        Make_ID: 460,
        Make_Name: 'Ford',
        Model_ID: 1780,
        Model_Name: 'Fusion',
      },
    ];

    mockVehicleService = jasmine.createSpyObj('VehicleService', [
      'updateCurrentWindowSize',
    ]);
    mockVehicleService.windowSizeSubject = mockWindowSizeSubject;
    await TestBed.configureTestingModule({
      declarations: [ModelsComponent],
      providers: [{ provide: VehicleService, useValue: mockVehicleService }],
      imports: [ScrollingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelsComponent);
    component = fixture.componentInstance;
    component.closeModelContent = new EventEmitter<string>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close model container event on close click', () => {
    // Arrange
    let eventEmitted = false;
    component.closeModelContent.subscribe(() => {
      eventEmitted = true;
    });

    // Act
    component.closeModels();

    // Assert
    expect(eventEmitted).toBe(true);
  });

  it('should display the list of models from the input observable', async () => {
    // Arrange
    component.vehicleModels$ = of(modelResponse);

    // Act
    fixture.detectChanges(); // Firest detection
    await fixture.whenStable();// Wait for the asynchronous operations to complete
    fixture.detectChanges(); // Second detection

    // Assert
    const listItems = fixture.debugElement.queryAll(By.css('.model-content'));
    expect(listItems.length).toBe(modelResponse.length);
  });
});
