import { Todo }                                  from "./todo";
import { TodoService }                           from "./todo.service";
import { TodoActions }                           from "./todo.actions";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { Injectable }  from   "@angular/core";
import { finalize, tap } from "rxjs";

export class TodoStateModel{
  todos?: Todo[];
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
  constructor(
    private todoService: TodoService
  ) {}

  //Todoのリスト
  @Selector()
  static todos(state: TodoStateModel){
    return state.todos;
  }

  //選択中のTodo
  @Selector()
  static selectedTodo(state: TodoStateModel){
    return state.selectedTodo;
  }

  //todoリスト読み込み
  @Action(TodoActions.Load)
  load(ctx: StateContext<TodoStateModel>){
    return this.todoService.getTodos().pipe(
      tap((data) => {
        ctx.patchState({
          todos: data
        });
      })
    )
  }

  //選択されたTodo
  @Action(TodoActions.Select)
  Select(ctx: StateContext<TodoStateModel>, action: TodoActions.Select){
    const id = action.id;
    return this.todoService.getTodo(id).pipe(
      tap((data: Todo) => {
        ctx.patchState({
          selectedTodo: data
        })
      })
    )
  }

  //Todo追加時
  @Action(TodoActions.Add)
  Add(ctx: StateContext<TodoStateModel>, action: TodoActions.Add){
    const todo = action.payload

    return this.todoService.addTodo(todo).pipe(
      finalize(() => {
        ctx.dispatch(new TodoActions.Load())
      })
    )
  }

  //Todo削除時
  @Action(TodoActions.Remove)
  remove(ctx: StateContext<TodoStateModel>, action: TodoActions.Remove){
    const id = action.id
    return this.todoService.removeTodo(id).pipe(
      finalize(() => {
        ctx.dispatch(new TodoActions.Load())
      })
    )
  }

  //Todo更新時
  @Action(TodoActions.Update)
  update(ctx: StateContext<TodoStateModel>, action: TodoActions.Update){
    const todo = action.payload
    return this.todoService.updateTodo(todo).pipe(
      finalize(() => {
        ctx.dispatch(new TodoActions.Load())
      })
    )
  }
}
