import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDo3Service{

  jsonURL = 'http://localhost:3000/TASK';
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
  updatetask(body:any)
  {
    return this.http.put(`${this.jsonURL}/${body.id}`, body);
  }
}

export class DynamicGrid
{
  id?:number;
  taskTitle?:string;
  taskList?: Array<TaskDetails> = new Array<TaskDetails>();
}

export class TaskDetails
{
  checkbox?:boolean;
  taskName?: string;
}
