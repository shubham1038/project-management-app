import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators'

@Injectable()
export class UserService {

  //http url
  //private baseUrl ="http://ec2-15-206-159-184.ap-south-1.compute.amazonaws.com/fse-pm-app/api/users/";
  //Https Url
  private baseUrl ="https://shubhtech1038.xyz/fse-pm-app/api/users/";
  constructor(private http: HttpClient) { }

  addUser(employee: Employee): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee).pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  updateUser(employee: Employee): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, employee).pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      retry(1),
      catchError(err => {
        console.log('!!!!!!!!!!!!!' + JSON.stringify(err));
        return throwError(err);
      })
    )
  }

  deleteUser(userId: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}` + userId).pipe(
      retry(2),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  errorHandler(error: HttpErrorResponse){
    console.log('!!!!!!!!!!!!!8888888' + error);
    
    return throwError(error || 'Server Error')
  }
}

