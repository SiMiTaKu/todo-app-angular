import { Component, OnInit } from '@angular/core';
import { TodoService }       from "../todo.service";
import { CategoryService }   from "../category.service";
import { Todo }              from "../todo";
import { Category }          from "../category";
import { TodoState }         from "../todoState";
import { Color }             from "../color";

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

  constructor(private todoService: TodoService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getTodos();
    this.getCategories();
    this.getTodoStates();
    this.getColors();
  }

  getTodos(){
    this.todoService.getTodos().subscribe(_ => this.todos = _);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getTodoStates(){
    this.todoService.getState().subscribe(_ => this.states = _);
  }

  getColors(){
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getThisCategoryName(categoryId: number){
    return this.categories.filter(_ => _.id == categoryId).map(_ => _.name);
  }

  getThisCategoryColor(categoryId: number){
    const categoryColorId = this.categories.filter(_ => _.id == categoryId).map(_ => _.id).pop()
    return this.colors.filter(_ => _.id == categoryColorId).map(_ => _.name)
  }

  getThisState(stateCode: number){
    return this.states.filter(_ => _.id == stateCode).map(_ => _.status);
  }
}
