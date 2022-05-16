import { Component, OnInit }      from '@angular/core';
import { CategoryService }        from "../category.service";
import { TodoService }            from "../todo.service";
import { Category }               from "../category";
import { Color }                  from "../color";
import { TodoState }              from "../todoState";
import { Todo }                   from "../todo";
import { Location }               from "@angular/common";
import { Router }                 from "@angular/router";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector:    'app-todo-register',
  templateUrl: './todo-register.component.html',
  styleUrls:   ['./todo-register.component.scss']
})
export class TodoRegisterComponent implements OnInit {
  todos:      Todo[]      = [];
  categories: Category[]  = [];
  colors:     Color[]     = [];
  states:     TodoState[] = [];

  todoRegisterForm?: FormGroup;

  constructor(
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private location:        Location,
    private fb:              FormBuilder,
    private router:          Router
  ) { }

  ngOnInit(): void {
    this.getTodos();
    this.getCategories();
    this.getColors();
    this.getStates();
    this.todoRegisterForm = this.fb.group({
      todoTitle:    ['',  Validators.required],
      todoBody :    ['',  Validators.required],
      todoCategory: ['',  Validators.required],
      todoState:    ['1', Validators.required]
    });
  }

  get title    () { return this.todoRegisterForm?.get('todoTitle');}
  get body     () { return this.todoRegisterForm?.get('todoBody');}
  get category () { return this.todoRegisterForm?.get('todoCategory');}
  get state    () { return this.todoRegisterForm?.get('todoState');}

  getTodos(): void {
    this.todoService.getTodos().subscribe(_ => this.todos = _);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getStates(): void {
    this.todoService.getState().subscribe(_ => this.states = _)
  }

  add(): void{
    if(this.todoRegisterForm?.invalid) {
      alert("Error!! Please check form area.")
    }else{
      this.todoService.addTodo({
        title:       this.todoRegisterForm?.value.todoTitle,
        category_id: this.todoRegisterForm?.value.todoCategory,
        body:        this.todoRegisterForm?.value.todoBody,
      } as Todo).subscribe(
        todo  => this.todos.push(todo),
        error => alert(error),
        ()    => this.goToTodoList()
      );
    }
  }

  goToTodoList(): void {
    this.router.navigateByUrl('/todos');
  }
}
