import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/evironment/config';


@Injectable({
  providedIn: 'root'
})

export class ToDo3Service {

  isLoader = new BehaviorSubject <boolean>(false);
  todoApi = environment.todoAPI;

  constructor(private http: HttpClient) { }

  loderShow() {
    this.isLoader.next(false);
  }

  loderHide() {
    this.isLoader.next(false);
  }

  addTodo(body: Todo) {
    return this.http.post(this.todoApi, body)
  }

  getTodo() {
    return this.http.get<Array<Todo>>(this.todoApi);
  }

  deleteTodo(data: Todo) {
    return this.http.delete(`${this.todoApi}/${data.id}`);
  }

  updateTodo(data: Todo) {
    return this.http.put(`${this.todoApi}/${data.id}`, data);
  }

  // Add Task
  addTask(body: todoTask, todoId) {
    return this.http.post(`${this.todoApi}/${todoId}/task`, body);
  }

  // Delete Task
  deleteTask(todoId, body: any) {

    return this.http.delete(`${this.todoApi}/${todoId}/task/${body}`);
  }
  // Update Task
  updateTask(todoId: any, data: any) {
    return this.http.put(`${this.todoApi}/${todoId}/task/${data.id}`, data);
  }
}

export class Todo {
  id: number;
  name: string;     //Todo Title
  addedOn: Date = new Date();
  tasks: Array<todoTask> = new Array<todoTask>();
  isInput: boolean = false;
  isfillTodo: boolean = false;
}

export class todoTask {
  id: number;
  todoId: number;
  name: string;     //Task Name
  isCompleted: boolean = false;
  isInputTask : boolean;
}
