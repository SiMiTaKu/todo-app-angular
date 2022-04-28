import { Component, OnInit } from '@angular/core';
import { TODOS }             from "../mock-todo";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  title = 'Todo List';
  todos = TODOS;　　//todosにTODOSをバインディング

  constructor() { }

  ngOnInit(): void {
  }
}
