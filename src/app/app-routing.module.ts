import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'en/viewTask',
    pathMatch: 'full'
  },
  {
    path: ':lang/user',
    loadChildren: () => import('./user/user.module')
                .then(v => v.UserModule)
  },
  {
    path: ':lang/viewTask',
    loadChildren: () => import('./view-task/view-task.module')
                .then(v => v.ViewTaskModule)
  },
  {
    path: ':lang/addTask',
    loadChildren: () => import('./add-task/add-task.module')
                .then(v => v.AddTaskModule)
  },
  {
    path: ':lang/project',
    loadChildren: () => import('./project/project.module')
                .then(v => v.ProjectModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
