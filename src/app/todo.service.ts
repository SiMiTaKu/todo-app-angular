import { Injectable }     from '@angular/core';
import { TODOS }          from "./mock-todo";
import { Todo }           from "./todo";
import { Observable, of } from "rxjs";
import {TodoState} from "./todoState";
import {TODOSTATE} from "./mock-todoState";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Observable<Todo[]> {
    const  todos = of(TODOS);
    return todos;
  }

  getTodo(id: number): Observable<Todo> {
    const  todo = TODOS.find(t => t.id === id)!;
    return of(todo);
  }

  getState(): Observable<TodoState[]>{
    const  state = of(TODOSTATE);
    return state;
  }
}
