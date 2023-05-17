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
  searchValue: any;
  update: boolean;
  date: Date = new Date();

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
    this.task = new DynamicGrid;
    },

    error: (err) => {console.log(err)},
    complete: () => {console.log('Success')
    this.toastr.success('Add Task Successfully...',);}
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
deletetask(data: DynamicGrid) {
  this.api.deletetask(data).subscribe({
    next: (res: any) => {
      console.log(res)
      this.task = new DynamicGrid();
      this.getTask();
    },
    error: (res) => { console.log(res); },
    complete: () => { this.toastr.success('Delete Task Successfully...',);
    }
  })
}

fillData(i: any) {

  this.task = i;
  this.update = true;
}

upDateData() {
  this.api.updatetask(this.task).subscribe({
    next: (res: any) => {

      this.getTask();
      this.task = new DynamicGrid();
      this.update = false;
      this.toastr.success('Update Task Succesfully..')
    },
    error: (err) => { console.log(err) },
    complete: () => { }
  })
}


typingSearchData() {
  if (this.searchValue) {
    let searchEmployee = new Array<DynamicGrid>();
    if (this.alltask.length > 0) {
      for (let emp of this.alltask) {
        if (JSON.stringify(emp).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
          searchEmployee.push(emp);
        }
      }
      this.alltask = searchEmployee;
    }
    else {
      this.getTask();
    }
  }
  else {
    this.getTask();
  }
}

}  