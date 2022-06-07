import {Component, OnInit} from '@angular/core';
import {TodoService}       from "../todo.service";
import {CategoryService}   from "../category.service";
import {Todo}              from "../todo";
import {Category}          from "../category";
import {TodoState}         from "../todoState";
import {Color}             from "../color";
import {TodoImportance}    from "../todoImportance";
import {Select, Store}     from "@ngxs/store";
import {TodoNgxsState}     from "../todo.state";
import {Observable}        from "rxjs";
import {TodoActions}       from "../todo.actions";

@Component({
  selector: 'app-todos', templateUrl: './todos.component.html', styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @Select(TodoNgxsState.todos) todos$?: Observable<Todo[]>

  title = 'Todo List';

  todos:      Todo[]      = [];
  categories: Category[]  = [];
  states:     TodoState[] = [];
  colors:     Color[]     = [];

  constructor(
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private store:           Store
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTodoStates();
    this.getColors();
    this.getTodos();
  }


  getTodos(): void {
    this.store.dispatch(new TodoActions.Load()).subscribe(
      _ => _,
      error => console.error("🚨" + error),
      () => console.log(this.todos)
    )
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getTodoStates(): void {
    this.todoService.getState().subscribe(_ => this.states = _);
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getThisCategoryName(categoryId: number): string[] {
    return this.categories.filter(_ => _.id == categoryId).map(_ => _.name);
  }

  getThisCategoryColor(categoryId: number): string[] {
    const categoryColorId = this.categories.filter(_ => _.id == categoryId).map(_ => _.color).pop();
    return this.colors.filter(_ => _.id == categoryColorId).map(_ => _.name);
  }

  getThisState(stateCode: number): string[] {
    return this.states.filter(_ => _.id == stateCode).map(_ => _.status);
  }

  remove(todo: Todo): void {
    this.store.dispatch(new TodoActions.Remove(todo))
  }

  convertDateTime(dateTime: Date): string {
    return new Intl.DateTimeFormat('ja-Jp-u-ca-japanese', {
      month: "long", day: "numeric", hour: "numeric", minute: "numeric"
    }).format(new Date(dateTime))
  }

  // //id順にソート
  // sortById(): void{
  //   this.todos.sort(
  //     (todoA, todoB) => todoA.id - todoB.id
  //   )
  // }
  // //新しい順にソート
  // sortByDate(): void{
  //   this.todos.sort(
  //     (todoA, todoB) => new Date(todoB.updated_at).getTime() - new Date(todoA.updated_at).getTime()
  //   )
  // }
  // //終わってない順にソート
  // sortByState(): void{
  //   this.todos.sort(
  //     (todoA, todoB) => todoA.state - todoB.state
  //   )
  // }
  // //カテゴリのid順にソート
  // sortByCategory(): void{
  //   this.todos.sort(
  //     (todoA, todoB) => todoA.category_id - todoB.category_id
  //   )
  // }
  // //重要度順にソート
  // sortByImportance():void{
  //   this.todos.sort(
  //     (todoA, todoB) => todoA.importance - todoB.importance
  //   )
  // }
}
