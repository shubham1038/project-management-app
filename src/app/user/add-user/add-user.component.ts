import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/core/model/employee';
import { UserService } from 'src/app/core/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from 'src/app/shared/components/confirmok/data/modal-service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild("userForm") userForm;
  lang: string = 'en';
  searchName: string;
  desc: boolean = false;
  public employee = new Employee('', 'Kumar', '123', '');
  public empList: any = [];
  public displayAddBtn: boolean = true;
  constructor(private translate: TranslateService,
    private router: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private modalService: ModalService) {
  }

  ngOnInit(): void {
    //  this.spinner.show();
    if (this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
    this.userService.getUserList().subscribe(data => {
      this.empList = data || []
      //this.spinner.hide();
      this.reset();
    },error =>{
      this.reset();
      this.spinner.hide();
      this.redirectAfterSave(error.error.message, () => { }, "Error");
    })
  };

  reset(): void {
    this.userForm.submitted = false;
    this.employee = {
      employeeId: null,
      firstName: null,
      lastName: null,
      userId: null
    }
  }

  onSubmit(): void {
    console.log(this.employee)
    this.spinner.show();
    if (this.employee.userId) {
      this.userService.updateUser(this.employee).subscribe((resp) => {
        this.userService.getUserList().subscribe(data => {
          this.empList = data || []
          this.displayAddBtn = true;
          this.reset();
          this.spinner.hide();
          this.redirectAfterSave("User updated successfully", () => { this.reset() }, "Success");
        }, error => {
          this.spinner.hide();
          this.redirectAfterSave("error.error.message.", () => { }, "Error");
        })
        console.log(resp)
      })
    } else {
      this.userService.addUser(this.employee).subscribe((resp) => {
        this.userService.getUserList().subscribe(data => {
          this.empList = data || []
          this.reset();
          this.spinner.hide();
          this.redirectAfterSave("User Saved successfully", () => { this.reset() }, "Success");
        }, error => {
          this.spinner.hide();
          this.redirectAfterSave("Error occured..", () => { }, "Error");
        })
        console.log(resp)
      })
    }
  }

  deleteUser(id: number) {
    this.spinner.show();
    console.log('Employee Id -' + id)
    this.userService.deleteUser(id).subscribe(data => {
      this.userService.getUserList().subscribe(data => {
        this.empList = data || []
        this.spinner.hide();
        this.redirectAfterSave("User deleted successfully", () => { }, "Success");
      },error =>{
        this.empList = []
        this.reset();
        this.spinner.hide();
        this.redirectAfterSave(error.error.message, () => { }, "Error");
      })
      console.log('Employee -' + id + 'Deelted successfully')

    }, error => {
      this.spinner.hide();
      this.redirectAfterSave("Error occured..", () => { }, "Error");
    })
  }

  updateUser(empObj: Employee) {
    console.log('Updated object -' + empObj)
    this.employee = Object.assign({}, empObj)
    this.displayAddBtn = false;

  }
  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }

  sort(val: string) {
    this.desc = !this.desc;
    let direction = this.desc ? 1 : -1
    this.empList.sort(function (a, b) {
      if (a[val] > b[val]) {
        return 1 * direction;
      } else if (a[val] < b[val]) {
        return -1 * direction;
      } else {
        return 0;
      }
    });
  }
}
