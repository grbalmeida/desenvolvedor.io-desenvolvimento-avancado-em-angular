import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '../../todo.store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tasks-finalizadas',
  templateUrl: './tasks-finalizadas.component.html'
})
export class TasksFinalizadasComponent implements OnInit {
  finalizados$: Observable<any[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.finalizados$ = this.store.getTodoList()
      .pipe(
        map(todolist => todolist.filter(task => task.finalizado)));
  }
}