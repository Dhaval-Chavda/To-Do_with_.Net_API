import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoComponent } from './to-do.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

describe('ToDoComponent', () => {
  let component: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [ ToDoComponent ],
      imports:[
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot()
      ],
      providers:[
        HttpClient
      ]

      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
