import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/core/service';
import { Project } from 'src/app/core/model/project';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from 'src/app/shared/components/confirmok/data/modal-service';
import { InteractionService } from 'src/app/core/service/interaction.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public projectList: any = [];
  public projectLength:any ;
  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  searchName:string;
  isDesc:boolean;
  constructor(private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private modalService: ModalService,
    private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getProject();
    this.interactionService.projectList$.subscribe(response => {
      console.log('project List - ' + JSON.stringify(response));
      this.projectList = response;
     
    })
  }
  sort(property){
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;
    this.projectList.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  }
  getProject() {
    this.projectService.getProjects().subscribe(data => {
      console.log('project Data - ' + JSON.stringify(data));
      this.projectList = data;
      this.projectLength = data.length;
      this.calculateNoOfTaskandCompletedTask();
      console.log('project length - ' + JSON.stringify(this.projectLength));
      this.spinner.hide()
    }, error => {
      this.spinner.hide()
      this.redirectAfterSave(error.error.message, () => { }, "Error");
    })
  }
  deleteUser(projectId: string): void {
    this.deleteEvent.emit(projectId)
  }

  updateUser(project: Project): void {
    this.updateEvent.emit(project);
    // this.projectList =  Object.assign({},project)
  }
  redirectAfterSave(popMsg, confirmCallBack, popTitle) {
    this.modalService.confirmOK(popMsg, confirmCallBack, popTitle)
  }
  calculateNoOfTaskandCompletedTask() {
    if(this.projectList && this.projectList.length > 0) {
      this.projectList.forEach(project => {
        if(project && project.tasks) {
          project.noOfTasks = project.tasks.length;
          project.completedTasks = project.tasks.filter(task => task.status == 0).length;
        }
      });        
    }
  }
}
