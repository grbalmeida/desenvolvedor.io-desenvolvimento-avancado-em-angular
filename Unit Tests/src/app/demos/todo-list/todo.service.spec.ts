import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Observable, Observer } from 'rxjs';

import { TasksService } from './todo.service';
import { Store } from './todo.store';
import { Task } from './task';

const todolist: Task[] = [
    {
        id: 1,
        nome: 'Responder e-mails',
        finalizado: false,
        iniciado: true
    },
];

function createResponse(body) {
    return new Observable((observer: Observer<any>) => {
        return observer.next(body);
    });
}

class MockHttp {
    get() {
        return createResponse(todolist);
    }
}

describe('TasksService', () => {
    let service: TasksService;
    let http: HttpClient;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useClass: MockHttp },
                TasksService,
                Store
            ]
        });

        http = bed.get(HttpClient);
        service = bed.get(TasksService);
    });

    it('Deve retornar lista de tarefas', () => {
        // spyOn(http, 'get').and.returnValue(createResponse(todolist));

        service.getTodoList$
            .subscribe((result) => {
                expect(result.length).toBe(1);
                expect(result).toEqual(todolist);
            });
    });
});
