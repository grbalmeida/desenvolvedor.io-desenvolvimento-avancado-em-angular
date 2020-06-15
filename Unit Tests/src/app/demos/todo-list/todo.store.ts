import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './task';

export interface State {
    todolist: Task[];
}

const initialState: State = {
    todolist: []
};

export class Store {
    // propagador do estado atual da store (value)
    private subject = new BehaviorSubject<State>(initialState);
    private store = this.subject.asObservable();

    get value() {
        return this.subject.value;
    }

    public getTodoList(): Observable<Task[]> {
        return this.store
            .pipe(map(store => store.todolist));
    }

    set(name: string, state: any) {
        this.subject.next({
            ...this.value, [name]: state
        });
    }
}
