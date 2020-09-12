import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task.component';


const routes: Routes = [
  {
    path: '',
    component: ViewTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTaskRoutingModule { }
