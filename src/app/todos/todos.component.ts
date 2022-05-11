import { Component, OnInit } from '@angular/core';
import { TodoService }       from "../todo.service";
import { CategoryService }   from "../category.service";
import { Todo }              from "../todo";
import { Category }          from "../category";
import { TodoState }         from "../todoState";
import { Color }             from "../color";
import { Router }            from "@angular/router";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  title                  = 'Todo List';
  todos: Todo[]          = [];
  categories: Category[] = [];
  states: TodoState[]    = [];
  colors: Color[]        = [];


  constructor(
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private router:          Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTodoStates();
    this.getColors();
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      _ => console.log(_),
      error => console.log(error),
      () => console.log(this.todos)
    );
  }

  // getTodos(): void {
  //   this.todoService.getTodos().subscribe(_ => this.todos = _);
  // }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getTodoStates(): void {
    this.todoService.getState().subscribe(_ => this.states = _);
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getThisCategoryName(categoryId: number): string[]{
    return this.categories.filter(_ => _.id == categoryId).map(_ => _.name);
  }

  getThisCategoryColor(categoryId: number): string[]{
    const categoryColorId = this.categories.filter(_ => _.id == categoryId).map(_ => _.color).pop();
    return this.colors.filter(_ => _.id == categoryColorId).map(_ => _.name);
  }

  getThisState(stateCode: number): string[]{
    return this.states.filter(_ => _.id == stateCode).map(_ => _.status);
  }

  remove(todo: Todo): void{
    this.todos = this.todos.filter(_ => _ !== todo);
    this.todoService.removeTodo(todo.id).subscribe();
  }
}
