import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmok',
  templateUrl: './confirmok.component.html',
  styleUrls: ['./confirmok.component.css']
})
export class ConfirmokComponent implements OnInit {

  title: string = 'Information';
  msg: string = '';

  confirmLabel: string = 'OK';
  confirmCallback: Function;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  confirmClick() {
    if (this.confirmCallback) {
        this.confirmCallback()
    }
}

}
