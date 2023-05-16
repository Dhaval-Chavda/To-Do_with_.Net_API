import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDo3Service{

  jsonURL = 'http://localhost:3000/TASK';
  
  constructor(private http: HttpClient) { }


  addData(body: DynamicGrid){
    return this.http.post(this.jsonURL,body)
  }

  getData(){
    return this.http.get<Array<DynamicGrid>>(this.jsonURL);
  }

}

export class DynamicGrid
{
  id?:number;
  title1?:string;
  taskList?: Array<TaskDetails> = new Array<TaskDetails>();
}

export class TaskDetails
{
  checkbox?:boolean;
  taskName?: string;
}
