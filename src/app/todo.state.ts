import { Todo }                                  from "./todo";
import { TodoService }                           from "./todo.service";
import { TodoActions }                           from "./todo.actions";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable }                            from "@angular/core";
import { tap }                                   from "rxjs";

export class TodoStateModel{
  todos?: Todo[];
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: []
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
}
