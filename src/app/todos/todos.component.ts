import { Component, OnInit } from '@angular/core';

import { CategoryService } from "../category.service";
import { Category }        from "../category";
import { Color }           from "../color";

import { Todo }          from "../todo";
import { TodoState }     from "../todoState";
import { TodoNgxsState } from "../todo.state";
import { TodoService }   from "../todo.service";
import { TodoActions }   from "../todo.actions";

import {Select, Store }    from "@ngxs/store";
import {Observable }       from "rxjs";
import {CategoryActions}   from "../category.actions";
import {CategoryNgxsState} from "../category.state";

@Component({
  selector: 'app-todos', templateUrl: './todos.component.html', styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @Select(TodoNgxsState.todos) todos$?: Observable<Todo[]>

  @Select(CategoryNgxsState.categories) categories$?: Observable<Category[]>

  title = 'Todo List';

  todos:      Todo[]      = [];
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
    this.store.dispatch(new TodoActions.Load()).subscribe(
      _     => this.todos = _.todos.todos,
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
    this.todos.sort(
      (todoA, todoB) => todoA.id - todoB.id
    )
  }
  //新しい順にソート
  sortByDate(): void{
    this.todos.sort(
      (todoA, todoB) => new Date(todoB.updated_at).getTime() - new Date(todoA.updated_at).getTime()
    )
  }
  //終わってない順にソート
  sortByState(): void{
    this.todos.sort(
      (todoA, todoB) => todoA.state - todoB.state
    )
  }
  //カテゴリのid順にソート
  sortByCategory(): void{
    this.todos.sort(
      (todoA, todoB) => todoA.category_id - todoB.category_id
    )
  }
  //重要度順にソート
  sortByImportance():void{
    this.todos.sort(
      (todoA, todoB) => todoA.importance - todoB.importance
    )
  }
}
