import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmokComponent } from './confirmok.component';

describe('ConfirmokComponent', () => {
  let component: ConfirmokComponent;
  let fixture: ComponentFixture<ConfirmokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
