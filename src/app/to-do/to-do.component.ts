import { Component, OnInit } from '@angular/core';
import { DynamicGrid, TaskDetails, ToDo3Service } from '../to-do-3.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit{
 
alltask: Array<DynamicGrid> = new Array<DynamicGrid>();
// taskDetails!: TaskDetails;

task!: DynamicGrid;

constructor (private toastr: ToastrService, private api: ToDo3Service) {}

  dynamicArray: Array<DynamicGrid> = [];  
  newDynamic: any = {};

  
  ngOnInit(): void {
      this.task = new DynamicGrid;
      this.task.taskList = new Array<TaskDetails>;
      this.dynamicArray.push(this.newDynamic); 

      this.getTask();
      this.addBlankItem();
  }

  addBlankItem(){
    this.task.taskList.push(new TaskDetails());
  }

  removeBlankItem(i){
  
    this.task.taskList.splice(i, 1)
  }


// add & get methos

addTask(){
  this.api.addData(this.task).subscribe({
    next: (res) => {console.log(res)
    this.getTask();
    },

    error: (err) => {console.log(err)},
    complete: () => {console.log('Success')}
  })
}

getTask(){
  this.api.getData().subscribe({
    next:(res)=>{console.log(res)
    
      this.alltask = res},
    error: (err) => {console.log(err)},
    complete: () => {console.log('Success')}
  })
}

}  