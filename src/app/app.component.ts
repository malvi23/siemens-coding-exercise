import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'siemens-exercise';
  loggedInUser = 'John Doe';
  isSpinnerVisible: boolean = false;
  spinnerSub!: Subscription;

  constructor(
    public spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //  Subscribe to spinner subject 
    this.spinnerSub = this.spinnerService.isSpinnerVisibleSubject.subscribe(
      (isSpinnerVisible: boolean) => {
        this.isSpinnerVisible = isSpinnerVisible;
        this.cdr.detectChanges(); // Manually triggering change detection as value is coming from child
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribing the subcription to avoid memory leak
    this.spinnerSub?.unsubscribe();
  }
}
