import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Task } from './task';
import { Store } from './todo.store';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient, private store: Store) { }

  getTodoList$: Observable<Task[]> = this.http
    .get<Task[]>('http://localhost:3000/todolist')
    .pipe(
      tap(next => this.store.set('todolist', next)));

  toggle(event: any) {
    this.http
      .put(`http://localhost:3000/todolist/${event.task.id}`, event.task)
      .subscribe(() => {
        const value = this.store.value.todolist;
        
        const todolist = value.map(task => {
          if (event.task.id === task.id) {
            return { ...task, ...event };
          } else {
            return task;
          }
        });

        this.store.set('todolist', todolist);
      });
  }

  /* getToDoList(): Observable<Task[]> {
    return this.http
      .get<Task[]>('http://localhost:3000/todolist');
  } */
}