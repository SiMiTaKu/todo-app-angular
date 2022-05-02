import { Component, OnInit } from '@angular/core';
import { TodoService }       from "../todo.service";
import { Todo }              from "../todo";


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  title = 'Todo List';
  todos: Todo[] = [];

  //selectedTodo?: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos(){
    this.todoService.getTodos().subscribe(_ => this.todos = _)
  }

  // onSelect(todo: Todo){
  //   this.selectedTodo = todo;
  // }
}
