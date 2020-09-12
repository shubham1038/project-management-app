import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-search-parenttask',
  templateUrl: './search-parenttask.component.html',
  styleUrls: ['./search-parenttask.component.css']
})
export class SearchParenttaskComponent implements OnInit {

  title: string = 'Information';
  msg: string = '';
  confirmLabel: string = 'OK';
  selectedItem: any;
  confirmCallback: Function;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  confirmClick() {
    if (this.confirmCallback) {
        this.confirmCallback(this);
    }
  }
 
  listClick(event, newValue) {
    
    this.selectedItem = newValue; 
  }
}
