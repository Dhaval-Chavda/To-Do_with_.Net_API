import { TestBed } from '@angular/core/testing';

import { ToDo3Service } from './to-do-3.service';

describe('ToDo3Service', () => {
  let service: ToDo3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDo3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
