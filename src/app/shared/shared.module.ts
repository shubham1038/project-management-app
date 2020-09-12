import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmokComponent } from './components/confirmok';
import { SearchPopupComponent } from './components/search-popup/search-popup.component';
import { ModalService } from './components/confirmok/data/modal-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SearchProjectComponent } from './components/search-project/search-project.component';
import { SearchParenttaskComponent } from './components/search-parenttask/search-parenttask.component';
import { SearchpipePipe } from './pipes/searchpipe.pipe';
import { StringToDatedisplayPipe } from './pipes/stringtodate.pipe';


@NgModule({
  declarations: [ConfirmokComponent, SearchPopupComponent, SearchProjectComponent, SearchParenttaskComponent, SearchpipePipe, StringToDatedisplayPipe],
  imports: [
    CommonModule
  ],
   entryComponents:[
    ConfirmokComponent,
    SearchPopupComponent,
    SearchProjectComponent
  ],
  exports:[
    ConfirmokComponent,
    SearchPopupComponent,
    SearchProjectComponent,
    SearchpipePipe,
    StringToDatedisplayPipe
  ],
  providers: [ModalService,BsModalService]
})
export class SharedModule { }
