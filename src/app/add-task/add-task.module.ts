import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddTaskRoutingModule } from './add-task-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddTaskComponent } from './add-task.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AddTaskComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    AddTaskRoutingModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class AddTaskModule { }
