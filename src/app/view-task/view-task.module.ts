import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTaskRoutingModule } from './view-task-routing.module';
import { ViewTaskComponent } from './view-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [ViewTaskComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ViewTaskRoutingModule,
    ModalModule.forRoot(), 
    SharedModule,
    NgxSpinnerModule
  ]
})
export class ViewTaskModule { }
