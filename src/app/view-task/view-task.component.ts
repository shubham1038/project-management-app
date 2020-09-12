import { Component, OnInit } from '@angular/core';
import { ViewTaskService, ProjectService } from '../core/service';
import { TaskDetails } from '../core/model/task-details';
import { ModalService } from '../shared/components/confirmok/data/modal-service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: any = []
  projectsInfo: any = []
  desc: boolean = false;
  public modelRef: BsModalRef;
  selectedProject: any = null;
  taskId: string;

  constructor(private viewTaskService: ViewTaskService,
    private projectService: ProjectService,
    private modalService: ModalService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    this.spinner.show();
    this.viewTaskService.getTasks().subscribe(data => {
      console.log(data)
      this.tasks = data;
      this.spinner.hide();
    }, error => {
      this.spinner.hide()
      this.redirectAfterSave(error.error.message, () => { }, "Error");
    })
  }
  sort(property: string) {
    this.desc = !this.desc;
    let direction = this.desc ? 1 : -1;
    this.tasks.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    })
  }

  searchProject() {
    this.getProject();
  }

  getProject() {
    this.spinner.show();
    this.projectService.getProjects().subscribe(response => {
      console.log('response ---' + JSON.stringify(response))
      this.projectsInfo = response;
      this.spinner.hide();
      this.modelRef = this.modalService.openProjectSearchPopUp(
        this.projectsInfo,
        "Search Project",
        (obj) => { this.getSelectedProject(obj); },
        "Select"
      )
    }, error => {
      console.log('error')
    })
  }

  endTask(taskId) {
    console.log('taskId :' + taskId)
    this.viewTaskService.updateTaskStatus(taskId).subscribe(response => {
      this.redirectAfterSave("Task ended successfully", () => { }, "Success");
      this.getTasks();
    })
  }
  getSelectedProject(obj) {
    this.modelRef.hide();
    this.selectedProject = obj.selectedItem;
    this.tasks = obj.selectedItem.tasks;
  }

  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }

}
