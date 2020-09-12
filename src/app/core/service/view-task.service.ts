import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ViewTaskService {

  //baseUrl: string = 'http://ec2-15-206-159-184.ap-south-1.compute.amazonaws.com/fse-pm-app/api/tasks/';

  //http url
  //private baseUrl ="http://ec2-15-206-159-184.ap-south-1.compute.amazonaws.com/fse-pm-app/api/tasks/";
  //Https Url
  private baseUrl ="https://shubhtech1038.xyz/fse-pm-app/api/tasks/";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any>{
    return this.http.get(`${this.baseUrl}`)
  }

  getTaskById(taskId: String): Observable<any>{
    return this.http.get(`${this.baseUrl}` + taskId)
  }

  updateTaskStatus(taskId): Observable<any>{       
    return this.http.get(this.baseUrl + "updateTaskByTaskId?taskId=" + taskId);
  }

  updateTask(formValue): Observable<any>{       
    return this.http.put(this.baseUrl, formValue);
  }

  saveTask(formValue): Observable<any>{       
    return this.http.post(this.baseUrl, formValue);
}
}
