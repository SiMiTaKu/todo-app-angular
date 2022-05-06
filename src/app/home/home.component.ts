import { Component, OnInit } from '@angular/core';

@Component({
  selector    : 'app-home',
  templateUrl : './home.component.html',
  styleUrls   : ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title         = 'Todo app angular';
  todoList      = 'Todo List';
  categoryList  = 'category List';

  constructor() { }

  ngOnInit(): void {}
}
