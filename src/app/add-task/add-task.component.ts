import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTask } from '../core/model/add-task';
import { ViewTaskService, ProjectService, ParentTaskService, UserService } from '../core/service';
import { ModalService } from '../shared/components/confirmok/data/modal-service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  lang: string = 'en';
  @ViewChild("taskForm") taskForm;
  public taskModal: AddTask = new AddTask();
  public selectedTaskModal: AddTask = new AddTask();
  public selectedTaskId: string;
  public modelRef: BsModalRef;

  constructor(private translate: TranslateService,
    private router: ActivatedRoute,
    private taskService: ViewTaskService,
    private projectService: ProjectService,
    private modalService: ModalService,
    private parentTaskService: ParentTaskService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private route: Router) {

    if (this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    if (this.router.snapshot.params) {
      this.selectedTaskId = this.router.snapshot.params.taskId;
      if (this.selectedTaskId) {
        this.fetchSelectedTaskById()
      }
    }
    this.spinner.hide();
  }

  fetchSelectedTaskById() {
    this.taskService.getTaskById(this.selectedTaskId).subscribe(data => {
      this.selectedTaskModal = data;
      console.log(data)
      this.fetchSelectedProject(data['projectId'])

    })
  }

  fetchSelectedProject(projectId) {
    this.projectService.getProjectsById(projectId).subscribe(response => {
      this.selectedTaskModal.selectedProject = response;
      this.taskModal = this.selectedTaskModal;
    })
  }
  onSubmit() {
    if (this.taskModal) {
      if (this.taskModal.setParent) {
        this.saveParentTask()
      } else {
        this.saveTask()
      }
    }
  }

  saveParentTask() {
    this.spinner.show();
    let parentTask = { parentTask: this.taskModal.task }
    this.parentTaskService.saveParentTask(parentTask).subscribe(response => {
      this.redirectAfterSave("Parent Task Saved successfully", () => { this.reset() }, "Success");
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.redirectAfterSave("Error occured..", () => { }, "Error");
    })
  }

  saveTask() {
    this.spinner.show();
    if (this.taskModal && this.taskModal.taskId) {
      this.taskService.updateTask(this.taskModal).subscribe((response) => {
        this.redirectAfterSave("Task Updated successfully", () => { this.reset() }, "Success")
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.redirectAfterSave("Error occured ", () => { }, "Error")
        })
    } else {
      this.taskService.saveTask(this.taskModal).subscribe(response => {
        this.redirectAfterSave("Task Saved successfully", () => {
          this.reset();

          this.route.navigate([this.lang + '/viewTask/']);
        }, "Success");
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.redirectAfterSave("Error occured ", () => { }, "Error");
        })
    }
  }

  redirectAfterSave(popMsg, confirmCallBack, popTitle) {
    this.modalService.confirmOK(popMsg, confirmCallBack, popTitle)
  }

  searchProject() {
    this.spinner.show();
    this.projectService.getProjects().subscribe(response => {
      this.modelRef = this.modalService.openProjectSearchPopUp(response,
        "Search Project",
        (obj) => { this.searchedProject(obj); },
        "Select")
      this.spinner.hide();
    })
  }

  changeStartDate(event, date) {

  }

  searchEmployee() {
    this.spinner.show();
    this.userService.getUserList().subscribe(response => {
      this.modelRef = this.modalService.openSearchPopUp(response,
        "Search Employee",
        (obj) => { this.selectedEmployee(obj); },
        "Select")
      this.spinner.hide();
    })
  }

  selectedEmployee(obj) {
    this.taskModal.selectedEmployee = obj.selectedItem;
    this.modelRef.hide();
  }
  clearParentTask() {
    this.taskModal.selectedParentTask = new AddTask().selectedParentTask;
  }

  searchedProject(obj) {
    this.taskModal.selectedProject = obj.selectedItem;
    this.modelRef.hide();
  }

  searchParentTask() {
    this.spinner.show();
    this.parentTaskService.getParentTasks().subscribe(response => {
      this.modelRef = this.modalService.openParentTaskSearchPopUp(response,
        "Search Parent Task",
        (obj) => { this.selectedParentTask(obj); },
        "Select")
      this.spinner.hide();
    })
  }

  selectedParentTask(obj) {

    this.taskModal.selectedParentTask = obj.selectedItem;
    this.taskModal.selectedParentTask.parentId = obj.selectedItem.parentId;
    this.modelRef.hide();
  }

  reset() {
    this.taskForm.submitted = false;
    this.taskModal = new AddTask();
  }
}
