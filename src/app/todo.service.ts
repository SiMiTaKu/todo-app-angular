import { Injectable }              from '@angular/core';
import { Router }                  from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError }     from 'rxjs/operators';

import { Todo }      from "./todo";
import { TodoState } from "./todoState";
import { TODOSTATE } from "./mock-todoState";


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  API = {
    todosUrl : 'http://localhost:9000/api/todo',
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http:   HttpClient,
    private router: Router
  ) { }


  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API.todosUrl + "/list").pipe(
      catchError(this.handleError<Todo[]>('getTodos', []))
    );
  }

  getTodo(id: number): Observable<Todo> {
    const url = `${this.API.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  getState(): Observable<TodoState[]>{
    const  state = of(TODOSTATE);
    return state;
  }

  updateTodo(todo: Todo): Observable<any> {
    const url = `${this.API.todosUrl}/${todo.id}`
    return this.http.put(url, todo, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  addTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.API.todosUrl + "/add", todo, this.httpOptions).pipe(
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  removeTodo(id: number): Observable<Todo> {
    const url = `${this.API.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      catchError(this.handleError<Todo>(`removeTodo`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`🚨 ${operation} filed: ${error.message} 🚨`);
      this.router.navigate(['/error']);
      return of(result as T);
    };
  }
}
