import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksService } from '../../todo.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  todolist$: Observable<any[]>
  
  constructor(private taskService: TasksService) {}

  ngOnInit() {  
    this.todolist$ = this.taskService.getTodoList$;
  }  
}