import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectComponent } from './project.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ProjectComponent, AddProjectComponent, ProjectListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProjectRoutingModule,
    TranslateModule,
    BsDatepickerModule.forRoot(),
    NgxBootstrapSliderModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class ProjectModule { }
