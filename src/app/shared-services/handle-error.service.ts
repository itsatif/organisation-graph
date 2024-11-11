import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * @description Handle HTTP errors and show appropriate message using MatSnackBar.
   * @param error The error response object
   * @returns Observable with a user-facing error message
   */
  handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage =
        error.error.message ||
        'A network error occurred. Please try again later.';
    } else {
      errorMessage = this.getServerErrorMessage(error);
    }

    this.showErrorMessage(errorMessage);

    return throwError(() => new Error(errorMessage));
  };

  /**
   * @description Get server error message based on status code or message key.
   * @param error HttpErrorResponse object
   * @returns A string error message
   */
  private getServerErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error === 'string') {
      return error.error;
    }

    if (error.error?.message) {
      return error.error.message;
    }

    switch (error.status) {
      case 400:
        return 'Bad Request. Please check your input.';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'Forbidden. You don’t have permission to access this.';
      case 404:
        return 'Not Found. The requested resource is not available.';
      case 500:
        return 'Internal Server Error. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * @description Show error message in a snackbar.
   * @param message The message to display in the snackbar
   */
  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
  }
}
