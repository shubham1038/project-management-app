import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/core/model/project';
import * as moment from 'moment';
import { Employee } from 'src/app/core/model/employee';
import { UserService, ProjectService } from 'src/app/core/service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/components/confirmok/data/modal-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InteractionService } from 'src/app/core/service/interaction.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public lang: string = 'en';
  @ViewChild("projectform") projectform;
  public projectModal: Project = new Project('', false, '', '', new Employee('', '', '', ''), '', '');
  public selectedEmp: Employee = new Employee('', '', '', '');
  public empList: any = [];
  public modelRef: BsModalRef;
  public displayUpdateBtn: boolean = false;


  constructor(private translate: TranslateService,
    private router: ActivatedRoute,
    private userService: UserService,
    private modalService: ModalService,
    private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private interactionService: InteractionService) { }

  ngOnInit(): void {
    if (this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }

  }

  updateSelectedProject(proj: Project) {
    console.log('inside add project' + proj)
    this.projectModal = Object.assign({}, proj);
    this.displayUpdateBtn = true;
  }

  onSubmit(): void {
    this.spinner.show();
    if (this.projectModal.projectId) {
      this.displayUpdateBtn = false;
      this.projectService.updateProject(this.projectModal).subscribe(data => {
        this.getProjects();
        this.redirectAfterSave("Project updated successfully", () => {this.reset();}, "Success")
        this.reset();
        this.spinner.hide();
      })
    } else {
      this.projectService.addProject(this.projectModal).subscribe(data => {
        this.getProjects();
        this.redirectAfterSave("Project Added successfully", () => {this.reset();}, "Success")
        this.spinner.hide();
      })
    }

  }

  getProjects(){
    this.projectService.getProjects().subscribe(data => {
      console.log('project Data - ' + JSON.stringify(data));
      this.interactionService.updateProjectList(data)
      this.spinner.hide()
    },error =>{
      this.spinner.hide()
      this.redirectAfterSave(error.error.message, () => {}, "Error");
    })
  }

  changeStartDate(event, id) {
    this.projectModal.endDate = moment(event).add(1, 'days').format("yyyy-MM-dd");
  }

  searchEmployee() {
    this.spinner.show();
    this.userService.getUserList().subscribe(data => {
      this.empList = data || []
      this.spinner.hide();
      this.modelRef = this.modalService.openSearchPopUp(this.empList, 'Search', (obj) => { this.selectedEmployee(obj); }, "Select")
    })
  }

  reset(): void {
    this.projectModal = new Project(null, false, null, null, new Employee(null, null, null, null), null, null);
    this.projectform.submitted = false;
  }
  selectedEmployee(obj) {
    this.modelRef.hide();
    this.projectModal.selectedEmployee = obj.selectedItem;
  }

  redirectAfterSave(popMsg, confirmCallBack, popTitle) {
    this.modalService.confirmOK(popMsg, confirmCallBack, popTitle)
  }
}
