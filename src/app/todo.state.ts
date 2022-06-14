import { Injectable, Injector } from "@angular/core";

import { Todo }        from "./todo";
import { TodoService } from "./todo.service";

import { State, StateContext } from "@ngxs/store";
import { Receiver }            from "@ngxs-labs/emitter";
import { finalize, tap }       from "rxjs";

export class GetTodo {
  static readonly type = '[Todo] Get Todo';
  constructor( public payload: number) {}
}

export class AddTodo {
  static readonly type = '[Todo] Add Todo';
  constructor( public payload: Todo) {}
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove Todo';
  constructor( public payload: number) {}
}

export class UpdateTodo {
  static readonly type = '[Todo] Update Todo';
  constructor( public payload: Todo) {}
}

export interface TodoStateModel{
  todos:         Todo[];
  selectedTodo?: Todo;
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos:        [],
    selectedTodo: undefined
  }
})
@Injectable()
export class TodoNgxsState{

  private static todoService: TodoService;

  constructor(
    private injector: Injector
  ) {
    TodoNgxsState.todoService = injector.get<TodoService>(TodoService)
  }

  //Receiverの関係でactionだと[]で包まれた値が返ってきてしまう。typeだとそれを防げる。まだなぜかはわかっていない。
  @Receiver({ type: '[Todo] Get Todos' })
  static getTodos(
    { patchState }: StateContext<TodoStateModel>
  ){
    return this.todoService.getTodos().pipe(
      tap( todos => patchState({ todos: todos}))
    )
  }

  @Receiver( { type: '[Todo] Get Todo' })
  static getTodo(
    { patchState }: StateContext<TodoStateModel>,
    action: GetTodo
  ){
    const id = action.payload
    return this.todoService.getTodo(id).pipe(
      tap((data) => patchState({ selectedTodo: data}))
    )
  }

  @Receiver({ action: AddTodo })
  static addTodo(
    context: StateContext<TodoStateModel>,
    action: AddTodo
  ){
    const todo = action.payload;
    return this.todoService.addTodo(todo).pipe(
      finalize(() => this.getTodos)
    )
  }

  @Receiver({ action: RemoveTodo })
  static removeTodo(
    context: StateContext<TodoStateModel>,
    action: RemoveTodo
  ){
    const id = action.payload
    return this.todoService.removeTodo(id).pipe(
      finalize(() => this.getTodos)
    )
  }

  @Receiver({ action: UpdateTodo })
  static updateTodo(
    context: StateContext<TodoStateModel>,
    action: UpdateTodo
  ){
    const todo = action.payload
    return this.todoService.updateTodo(todo).pipe(
      finalize(() => this.getTodos)
    )
  }
}
