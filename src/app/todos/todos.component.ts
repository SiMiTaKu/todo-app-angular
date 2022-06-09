import { Component, OnInit } from '@angular/core';
import { Select, Store }     from "@ngxs/store";

import { Category }          from "../category";
import { CategoryService }   from "../category.service";
import { CategoryActions }   from "../category.actions";
import { CategoryNgxsState } from "../category.state";
import { Color }             from "../color";

import { Todo }          from "../todo";
import { TodoState }     from "../todoState";
import { TodoNgxsState } from "../todo.state";
import { TodoService }   from "../todo.service";
import { TodoActions }   from "../todo.actions";

import { map, Observable } from "rxjs";

@Component({
  selector: 'app-todos', templateUrl: './todos.component.html', styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @Select(TodoNgxsState.todos) todos$?: Observable<Todo[]>

  @Select(CategoryNgxsState.categories) categories$?: Observable<Category[]>

  title = 'Todo List';

  categories: Category[]  = [];
  states:     TodoState[] = [];
  colors:     Color[]     = [];

  loading = {
    "todos":      true,
    "categories": true,
    "colors":     true,
    "states":     true,
  }

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
    const transformTodo = map((resTodos: any) => resTodos.todos.todos as Todo[])
    this.store.dispatch(new TodoActions.Load()).pipe(
      transformTodo
    ).subscribe(
      _     => _,
      error => alert("🚨" + error),
      ()    =>  this.loading.todos = false
    )
  }

  getCategories(): void {
    this.store.dispatch(new CategoryActions.Load()).subscribe(
      _ => this.categories = _.categories.categories,
      error => alert("🚨" + error),
      ()    =>  this.loading.categories = false
    )
  }

  getTodoStates(): void {
    this.todoService.getState().subscribe(
      _ => this.states = _,
      error => alert("🚨" + error),
      ()    =>  this.loading.states = false
    );
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(
      _ => this.colors = _,
      error => alert("🚨" + error),
      ()    =>  this.loading.colors = false
    );
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
    this.store.dispatch(new TodoActions.Remove(todo.id))
  }

  convertDateTime(dateTime: Date): string {
    return new Intl.DateTimeFormat('ja-Jp-u-ca-japanese', {
      month: "long", day: "numeric", hour: "numeric", minute: "numeric"
    }).format(new Date(dateTime))
  }

  //id順にソート
  sortById(): void{
    const sortId = map((todos: Todo[]) => todos.sort(
      (todoA, todoB) => todoA.id - todoB.id
    ))
    this.todos$?.pipe(
      sortId
    ).subscribe(
      _ => _
    )
  }
  //新しい順にソート
  sortByDate(): void{
    const sortDate = map((todos: Todo[]) => todos.sort(
      (todoA, todoB) => new Date(todoB.updated_at).getTime() - new Date(todoA.updated_at).getTime()
    ))
    this.todos$?.pipe(
      sortDate
    ).subscribe(
      _ => _
    )
  }
  //終わってない順にソート
  sortByState(): void{
    const sortState = map((todos: Todo[]) => todos.sort(
      (todoA, todoB) => todoA.state - todoB.state
    ))
    this.todos$?.pipe(
      sortState
    ).subscribe(
      _ => _
    )
  }
  //カテゴリのid順にソート
  sortByCategory(): void{
    const sortCategory = map((todos: Todo[]) => todos.sort(
      (todoA, todoB) => todoA.category_id - todoB.category_id
    ))
    this.todos$?.pipe(
      sortCategory
    ).subscribe(
      _ => _
    )
  }
  //重要度順にソート
  sortByImportance():void{
    const sortImportance = map((todos: Todo[]) => todos.sort(
      (todoA, todoB) => todoA.importance - todoB.importance
    ))
    this.todos$?.pipe(
      sortImportance
    ).subscribe(
      _ => _
    )
  }
}
