import { TestBed } from '@angular/core/testing';

import { ToDo3Service } from './to-do-3.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ToDo3Service', () => {
  let service: ToDo3Service;


  beforeEach(() => {
    TestBed.configureTestingModule({

      imports:[
        HttpClientModule
      ],
      providers:[
        HttpClient
      ]
    });
    service = TestBed.inject(ToDo3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
