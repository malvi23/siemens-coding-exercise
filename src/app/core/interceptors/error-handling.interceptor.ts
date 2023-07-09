import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private router: Router, private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // Displaying a spinner until a response is received
    if (!(request.url.includes('/GetModelsForMakeId') || request.url.includes('/GetVehicleTypesForMakeId'))) { //excluding few apis as different spinner UI is used for them
      this.spinnerService.showSpinner();
    }
    
    return next.handle(request).pipe(
      catchError((error: any) => {
        let errorMsg = error.statusText;
        if (error instanceof HttpErrorResponse) {
          // Handling HTTP errors
          console.log('HTTP error:', error);
          if (error.status == 401) {
            this.router.navigate(['/vehicle-dashboard']);
          }
          errorMsg = error.error.message;
          alert(errorMsg);
        }
        return throwError(() => new Error(error.message));
      }),
      finalize(() => {
        this.spinnerService.hideSpinner(); // Hiding a spinner
      })
    );
  }
}
