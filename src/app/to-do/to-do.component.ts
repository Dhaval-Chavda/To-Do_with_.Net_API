import { Component, OnInit } from '@angular/core';
import { DynamicGrid, TaskDetails, ToDo3Service } from '../to-do-3.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  alltask: Array<DynamicGrid> = new Array<DynamicGrid>();

  task!: DynamicGrid;
  innernew:TaskDetails;

  //searching variables

  searchValue: any;

  //update

  update: boolean = true;

  // clear data

  clr = false;

  //Date

  date: Date = new Date();

  showInputField = false;

  inputData: string;
  addOneItemBtnToogle: boolean = false;

  constructor(private toastr: ToastrService, private api: ToDo3Service) { }

  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};


  ngOnInit(): void {
    this.task = new DynamicGrid;
    this.innernew = new TaskDetails;
    this.task.tasks = new Array<TaskDetails>;
    this.dynamicArray.push(this.newDynamic);

    this.getTask();
    this.addBlankItem();


  }

  addBlankItem() {
    this.task.tasks.push(new TaskDetails());
  }

  removeBlankItem(i:any) {
    if (this.task.tasks.length != 1) {
      this.task.tasks.splice(i, 1)
    }

  }


  // add data method

  addTask() {
    this.api.addData(this.task).subscribe({
      next: (res) => {
        console.log(res)
        this.getTask();
        this.task = new DynamicGrid;
        this.addBlankItem();
      },

      error: (err) => { console.log(err) },
      complete: () => {
        console.log('Success')
        this.toastr.success('Add Task Successfully...');
      }
    })
  }

  //add inner task

  addinner(todoId)
  {

    this.innernew.todoId = todoId;
    this.api.innerData(this.innernew,todoId).subscribe({
      next: (res) => {
        console.log(res)
        this.getTask();
        this.task = new DynamicGrid;
        this.addBlankItem();
      },
      complete: () => {this.toastr.success('Inner Task Added...')}
    })
  }



  // get data method

  getTask() {
    this.api.getData().subscribe({
      next: (res) => {
        console.log(res)
        this.alltask = res
      },
      error: (err) => { console.log(err) },
      complete: () => { console.log('Success get Data') }
    })
  }

  // delete task method

  deletetask(data: DynamicGrid) {
    this.api.deletetask(data).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getTask();
        this.task = new DynamicGrid();
        this.addBlankItem();

      },
      error: (res) => { console.log(res); },
      complete: () => {
        this.toastr.success('Delete All task Successfully...');
      }
    })
  }

  //inner delete task
  // removeTask(id) {
  //   this.api.innerDelete(id).subscribe({
  //     next: (res) => {
  //       console.log(res)
  //       this.getTask();
  //       this.task = new DynamicGrid();
  //       this.addBlankItem();

  //     }
  //   })
  // }

  // inner delete

  removeTask(todoId,data) {
    this.api.innerDelete(todoId,data).subscribe({
      next: (res) => {
        this.getTask();
      },
      // error: (err) => { this.toastr.error('Some error To Delete Task'); },
      complete: () => { this.toastr.success('Task Delete Successfull'); }
    })
  }



  // Fill Data And Update Method 

  fillData(data: DynamicGrid) {
    this.task = data;
    this.update = false;
  }

  upDateData() {
    this.api.updatetask(this.task).subscribe({
      next: (res: any) => {
        this.updateinner(this.task.id);
        this.getTask();
        this.task = new DynamicGrid();
        this.update = true;
        this.addBlankItem();
   

      },
      error: (err) => { console.log(err) },
      complete: () => { this.toastr.success('Update Task Succesfully..') }
    })
  }

  // inner update task

  updateinner(id){
    
    this.task.tasks.forEach((el)=>{
      this.api.innerUpdate(id,el).subscribe({
        next: (res) =>{console.log(res)
        this.getTask();
        }
      })
    })
  }


  // Searching Method in type

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

  // Clear Data

  clearData() {

    this.clr = true;
    this.getTask();
    this.update = false;
    this.task = new DynamicGrid;
    this.addBlankItem();
  }

  openInputField(item)
  {
    item.isInput = true;
    this.showInputField = !this.showInputField;
    if(this.addOneItemBtnToogle)
    {
      item.isInput = true;
      this.addOneItemBtnToogle = false;
    }
    else{
      item.isInput = false;
      this.addOneItemBtnToogle = true;
    }
  }


}  