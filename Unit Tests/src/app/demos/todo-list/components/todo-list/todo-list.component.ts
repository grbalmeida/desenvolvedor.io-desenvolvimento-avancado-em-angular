import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../task";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['todo-list.component.css']  
})
export class ToDoListComponent {

  @Input()
  list: Task[];

  @Output()
  toggle = new EventEmitter<any>();

  toggleItem(index: number, acao: 'iniciar' | 'finalizar' | 'retomar' | 'cancelar') {
    const task = this.list[index];

    const options = {
      'iniciar': { finalizado: false, iniciado: true },
      'finalizar': { finalizado: true, iniciado: false },
      'retomar': { finalizado: false, iniciado: true },
      'cancelar': { finalizado: false, iniciado: false }
    }

    const option = options[acao];

    task.finalizado = option.finalizado;
    task.iniciado = option.iniciado;

    this.toggle.emit({
      task: { ...task }
    });
  }
}