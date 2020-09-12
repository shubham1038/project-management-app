import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Project } from '../model/project';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ProjectService {

 // baseUrl: string = 'http://ec2-15-206-159-184.ap-south-1.compute.amazonaws.com/fse-pm-app/api/projects/';
   //http url
  //private baseUrl ="http://ec2-15-206-159-184.ap-south-1.compute.amazonaws.com/fse-pm-app/api/projects/";
  //Https Url
  private baseUrl ="https://shubhtech1038.xyz/fse-pm-app/api/projects/";
  constructor(private http: HttpClient) { }

  getProjects(): Observable<any>{
    return this.http.get(`${this.baseUrl}`)
  }

  getProjectsById(projectId): Observable<any>{
    return this.http.get(`${this.baseUrl}` + projectId)
  }

  deleteProject(projectId :string): Observable<any>{
    return this.http.delete(`${this.baseUrl}`+projectId)
  }
  
  addProject(project: Project): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, project).pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  updateProject(project: Project): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, project).pipe(
      retry(1),
      catchError(err => {
        return throwError(this.errorHandler);
      })
    )
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error || 'Server Error')
  }
}
