import { Injectable, Injector } from "@angular/core";

import { Todo }        from "./todo";
import { TodoService } from "./todo.service";

import { State, StateContext } from "@ngxs/store";
import { Receiver }            from "@ngxs-labs/emitter";
import { finalize, tap }       from "rxjs";

export class GetTodos {
  static readonly type = 'Get_Todos';
}

export class GetTodo{
  static readonly type = 'Get_Todo';
  constructor( public payload: number) {}
}

export class AddTodo{
  static readonly type = 'Add_Todo';
  constructor( public payload: Todo) {}
}

export interface TodoStateModel{
  todos: Todo[];
  selectedTodo?: Todo;
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
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

  @Receiver({ action: GetTodos })
  static getTodos(
    { patchState }: StateContext<TodoStateModel>
  ){
    return this.todoService.getTodos().pipe(
      tap( todos => patchState({ todos: todos}))
    )
  }

  @Receiver( { action: GetTodo })
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
}
