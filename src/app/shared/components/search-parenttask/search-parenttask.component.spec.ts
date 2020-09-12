import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchParenttaskComponent } from './search-parenttask.component';

describe('SearchParenttaskComponent', () => {
  let component: SearchParenttaskComponent;
  let fixture: ComponentFixture<SearchParenttaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchParenttaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchParenttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
