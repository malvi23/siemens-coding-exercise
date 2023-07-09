import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isSpinnerVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  showSpinner() {
    this.isSpinnerVisibleSubject.next(true)
  }

  hideSpinner() {
    this.isSpinnerVisibleSubject.next(false)
  }
}
