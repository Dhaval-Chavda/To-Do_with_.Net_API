import { Component, OnInit } from '@angular/core';
import { Todo, todoTask, ToDo3Service } from '../to-do-3.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  //Todo Get all Title Data
  allGetTodo: Array<Todo> = new Array<Todo>();

  todo: Todo;
  //add inner new task
  addnewTask: todoTask;
  editTask: todoTask;
  //searching method property
  searchValue: any;
  //update Toggle 
  isUpdate: boolean = true;
  // clear data after Update
  clear = false;

  panelOpenState = false;

  date: Date = new Date();

  showButton = false;

  constructor(private toastr: ToastrService, private api: ToDo3Service) { }

  // progress bar 
  isLoading: Subject<boolean> = this.api.isLoader;
  
  ngOnInit(): void {
    this.todo = new Todo;
    this.addnewTask = new todoTask;
    this.todo.tasks = new Array<todoTask>;
    this.getTodo();
    // this.addInput();
  }
  

  fillTask(task){
    this.editTask = task;

    if(task.isInputTask){
      task.isInputTask = false;
    }
    else{
      task.isInputTask = true;
    }
  }

  // add new Input Box to add Task
  // addInput() {
  //   this.todo.tasks.push(new todoTask());
  // }

  // // remove Input Box & Last One display
  // removeInput(i: any) {
  //   if (this.todo.tasks.length != 1) {
  //     this.todo.tasks.splice(i, 1)
  //   }
  // }

  // add Todo

  addTodo() {
    if(this.todo.name){

      this.api.loderShow();
      this.api.addTodo(this.todo).subscribe({
        next: (res) => {        
          this.getTodo();
          this.todo = new Todo;
          // this.addInput();
        },
        error: (err) => { console.log(err) },
        complete: () => {
          console.log('Success')
          this.toastr.success('Add Todo Successfully...');
        }
      })
    }
    else
    {
      this.toastr.warning('Please Enter Data...');
    }
  }

  //add task in Todo

  addTask(todoId) {
    this.addnewTask.todoId = todoId;
    this.api.addTask(this.addnewTask, todoId).subscribe({
      next: (res) => {
        console.log(res)
        this.getTodo();
        this.todo = new Todo; 
        
      },
      error: () => {this.toastr.error('Something Went Wrong...') }, 
      complete: () => { this.toastr.success('Inner Task Added...') }
    })

  }

  isTaskCompleted(todoId,itemData){
    this.api.updateTask(todoId, itemData).subscribe({
      next: (res) => {
        console.log(res)
        this.getTodo();
      }
    })
  }

  // get data method

  getTodo() {
    this.api.loderShow();
    this.api.getTodo().subscribe({
      next: (res) => {
        console.log(res)
        this.allGetTodo = res
      },
      error: (_err) => {this.api.loderShow()},
      complete: () => {this.api.loderHide() }
    })
  }

  // delete Todo method

  deleteTodo(data: Todo) {
    this.api.deleteTodo(data).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getTodo();
        this.todo = new Todo();
        // this.addInput();
      },
      error: (res) => {this.toastr.error('Something Went Wrong...') },
      complete: () => {
        this.toastr.success('Delete All Task Successfully...');
      }
    })
  }

  //delete Task

  deleteTask(todoId, data) {
    this.api.deleteTask(todoId, data).subscribe({
      next: (res) => {
        this.getTodo();
      },
      complete: () => { this.toastr.success('Inner Task  Delete Successfully...')}
    })
  }

  /**
   * This method is used to Edit todo
   * @param todo new todo 
   */

  editTodo(todo: Todo) {
    this.todo = todo;
    this.isUpdate = false;
  }

  // Update Data

  updateTodo() {
    this.api.updateTodo(this.todo).subscribe({
      next: (res: any) => {
        this.updateTask(this.todo.id);
        this.getTodo();
        this.todo = new Todo();
        this.isUpdate = true;
        // this.addInput();
      },
      error: (err) => { this.toastr.success('Something went wrong')},
      complete: () => { this.toastr.success('Update Task Successfully...') }
    })
  }

  // inner update task

  updateTask(id) {

      this.api.updateTask(id, this.editTask).subscribe({
        next: (res) => {
          console.log(res)
          this.getTodo();
        }
      })
  }

  // Search Todo & Task
  searchTodo() {
    if (this.searchValue) {
      let searchData = new Array<Todo>();
      if (this.allGetTodo.length > 0) {
        // Stringify all tasks and then search
        for (let srh of this.allGetTodo) {
          if (JSON.stringify(srh).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
            searchData.push(srh);
          }
        }
        this.allGetTodo = searchData;
      }
      else {
        this.getTodo();
      }
    }
    else{
      this.getTodo();
    }
  }
  // Clear Data after edit data

  clearEditData() {

    this.clear = true;
    this.getTodo();
    this.isUpdate = true;
    this.todo = new Todo;
   
  }

  //Open Input to add task
  openInputField(item) {
    if (!item.isInput) {
      item.isInput = true;
    }
    else {
      item.isInput = false;
    }
  }

  showDeleteButton()
  {
    this.showButton = true;
  }
  hideDeleteButton()
  {
    this.showButton = false;
  }

}  
