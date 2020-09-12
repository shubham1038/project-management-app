import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDetails } from 'src/app/core/model/task-details';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  lang:string ='en';
  @Input()
  taskDetails:any =[];

  @Output() endTaskEvent = new EventEmitter();
  constructor(private translate: TranslateService,
              private router: ActivatedRoute,
              private route : Router) {
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
   }

  ngOnInit(): void {
  }

  edit(taskId) {
    this.route.navigate([this.lang+'/addTask/'+taskId])
  }
  endTask(taskId): void{
    console.log('taskId---' +taskId)
    this.endTaskEvent.emit(taskId)
  }
}
