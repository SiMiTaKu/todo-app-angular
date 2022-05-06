import { Component, OnInit } from '@angular/core';
import {TodoService}         from "../todo.service";
import {Todo}                from "../todo";

@Component({
  selector    : 'app-home',
  templateUrl : './home.component.html',
  styleUrls   : ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title         = 'Todo app angular';
  todoList      = 'Todo List';
  categoryList  = 'category List';
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(){
    this.todoService.getTodos().subscribe(_ => this.todos = _);
  }
}
