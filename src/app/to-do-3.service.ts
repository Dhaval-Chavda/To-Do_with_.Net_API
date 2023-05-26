import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDo3Service{

  jsonURL = 'http://10.10.5.124:16100/Todo';
 

  splice: any;
  
  constructor(private http: HttpClient) { }


  addData(body: DynamicGrid){
    return this.http.post(this.jsonURL,body)
  }

  getData(){
    return this.http.get<Array<DynamicGrid>>(this.jsonURL);
  }

  deletetask(data:DynamicGrid)
  {
    return this.http.delete(this.jsonURL+'/'+data.id)
  }
  updatetask(data:DynamicGrid)
  {
    return this.http.put(`${this.jsonURL}/${data.id}`,data);
  }

  //inner add Task

  innerData(body: TaskDetails, todoId){
    return this.http.post(`http://10.10.5.124:16100/Todo/${todoId}/task`,body);
  }

  //Inner Delete Task

  innerDelete(todoId,body:any){

    return this.http.delete(`http://10.10.5.124:16100/Todo/${todoId}/task/${body}`);
  }

  //inner update

  innerUpdate(todoId:any, data:any)
  {
    return this.http.put(`http://10.10.5.124:16100/Todo/${todoId}/task/${data.id}`,data);
  }


}

export class DynamicGrid
{
  id?:number;
  
  name?:string;   //task Title
  addedOn: Date = new Date();
  tasks?: Array<TaskDetails> = new Array<TaskDetails>();
  isInput:boolean = false;
}

export class TaskDetails
{
  id:number;
  todoId:number;
  name?: string;   //Task name
  isCompleted?:boolean = false;
}
