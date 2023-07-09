import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {

  // Method to handle client-side errors globally
  handleError(error: any): void {
    console.error('An error occurred:', error);
    // alert( "Oops something went wrong. Please try again later or report the issue to ADMIN")
  }
}
