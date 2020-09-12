import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProjectService } from '../core/service';
import { Project } from '../core/model/project';
import { AddProjectComponent } from './add-project/add-project.component';
import { ModalService } from '../shared/components/confirmok/data/modal-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionService } from '../core/service/interaction.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild(AddProjectComponent) child: AddProjectComponent;

  constructor(private projectService: ProjectService,
    private modalService: ModalService,
    private spinner: NgxSpinnerService,
    private interactionService: InteractionService) { }

  ngOnInit(): void {
  }

  deleteProject(event): void {
    this.spinner.show();
    this.projectService.deleteProject(event).subscribe(data => {
      this.getProjects();
      this.redirectAfterSave("Project Deleted successfully", () => { }, "Success")
      this.spinner.hide();
      console.log('Deleted Successfeully ' + data);
    })
  }

  getProjects() {
    this.projectService.getProjects().subscribe(data => {
      console.log('project Data - ' + JSON.stringify(data));
      this.interactionService.updateProjectList(data)
      this.spinner.hide()
    }, error => {
      this.spinner.hide()
      this.redirectAfterSave(error.error.message, () => { }, "Error");
    })
  }
  updateProject(event): void {
    //Pass information to Add-Project component
    console.log(event);
    this.child.updateSelectedProject(event);
  }

  redirectAfterSave(popMsg, confirmCallBack, popTitle) {
    this.modalService.confirmOK(popMsg, confirmCallBack, popTitle)
  }
}
