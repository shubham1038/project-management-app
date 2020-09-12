import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ParentTaskService {

  //baseUrl: string = 'http://ec2-15-206-159-184.ap-south-1.compute.amazonaws.com/fse-pm-app/api/parentTasks/';
  //http url
  //private baseUrl ="http://ec2-15-206-159-184.ap-south-1.compute.amazonaws.com/fse-pm-app/api/parentTasks/";
  //Https Url
  private baseUrl ="https://shubhtech1038.xyz/fse-pm-app/api/parentTasks/";

  constructor(private http: HttpClient) { }

  getParentTasks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  updateParentTask(parentTaskId, formValue): Observable<any> {
    return this.http.put(this.baseUrl, formValue);
  }

  saveParentTask(formValue): Observable<any>{       
    return this.http.post(this.baseUrl, formValue);
}
}
