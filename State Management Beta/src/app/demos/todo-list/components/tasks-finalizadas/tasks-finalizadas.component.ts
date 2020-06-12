import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TasksService } from '../../todo.service';

@Component({
  selector: 'tasks-finalizadas',
  templateUrl: './tasks-finalizadas.component.html'
})
export class TasksFinalizadasComponent implements OnInit {

  finalizados$: Observable<any[]>;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.finalizados$ = this.tasksService.getTodoList$;      
  }
}