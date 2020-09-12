import { TestBed } from '@angular/core/testing';

import { ParentTaskService } from './parent-task.service';

describe('ParentTaskService', () => {
  let service: ParentTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
