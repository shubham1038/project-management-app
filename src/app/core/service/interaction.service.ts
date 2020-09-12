import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../model/project';

@Injectable()
export class InteractionService {

  private _projectList = new Subject<Project>();
  projectList$ = this._projectList.asObservable();
  
  constructor() { }

  updateProjectList(projects : Project){
    this._projectList.next(projects)
  }

}
