import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImguploadService {

  apiEndPoint ="https://photo-upload-research.herokuapp.com//api/image/upload";
  apiEndPoint2 = "https://photo-upload-research.herokuapp.com//api/image/multi/upload";
  constructor(public http:HttpClient) { }

  fileUpload (formData :FormData):Observable<Response>{
    return this.http.post<Response>(this.apiEndPoint, formData)
    .pipe(
        catchError(this.handleError)
    );
  }
  multiFileUpload(formData:FormData){
    return this.http.post<Response>(this.apiEndPoint2, formData)
    .pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
