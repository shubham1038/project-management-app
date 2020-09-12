import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.css']
})
export class SearchPopupComponent implements OnInit {

  confirmCallback: Function;
  selectedItem: any;
  title: string = 'Information';
  msg: string = '';
  confirmLabel: string = 'OK';
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  confirmClick() {
    if (this.confirmCallback) {
        this.confirmCallback(this);
    }
  }
 
  listClick(event, newValue) {
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
  }
}
