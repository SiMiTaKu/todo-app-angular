import { Component, OnInit }                  from '@angular/core';
import { Location }                           from "@angular/common";
import { Router }                             from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Category }        from "../category";
import { CategoryService } from "../category.service";
import { Color }           from "../color";
import { Todo }            from "../todo";
import { TodoState }       from "../todoState";
import { TodoService }     from "../todo.service";
import { TodoImportance }  from "../todoImportance";

import { Store }         from "@ngxs/store";
import {CategoryActions} from "../category.actions";

@Component({
  selector:    'app-todo-register',
  templateUrl: './todo-register.component.html',
  styleUrls:   ['./todo-register.component.scss']
})
export class TodoRegisterComponent implements OnInit {

  categories:        Category[]       = [];
  colors:            Color[]          = [];
  states:            TodoState[]      = [];
  importanceSeq:     TodoImportance[] = [];
  todoRegisterForm?: FormGroup;

  loading = {
    "categories":  true,
    "colors":      true,
    "states":      true,
    "importance":  true,
  }

  constructor(
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private location:        Location,
    private fb:              FormBuilder,
    private router:          Router,
    private store:           Store
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
    this.getStates();
    this.getImportance();
    this.todoRegisterForm = this.fb.group({
      todoTitle:      ['',  Validators.required],
      todoBody :      ['',  Validators.required],
      todoCategory:   ['',  Validators.required],
      todoState:      ['1', Validators.required],
      todoImportance: ['',  Validators.required]
    });
  }

  get title     () { return this.todoRegisterForm?.get('todoTitle');}
  get body      () { return this.todoRegisterForm?.get('todoBody');}
  get category  () { return this.todoRegisterForm?.get('todoCategory');}
  get importance() { return this.todoRegisterForm?.get('todoImportance');}

  getCategories(): void {
    this.store.dispatch(new CategoryActions.Load()).subscribe(
      _     => this.categories = _.categories.categories,
      error => alert(error),
      ()    => this.loading.categories = false
    )
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(
      _     => this.colors = _,
      error => alert("🚨" + error),
      ()    => this.loading.colors = false
    );
  }

  getStates(): void {
    this.todoService.getState().subscribe(
      _     => this.states = _,
      error => alert("🚨" + error),
      ()    => this.loading.states = false
    )
  }

  getImportance(): void {
    this.todoService.getImportance().subscribe(
      _     => this.importanceSeq = _,
      error => alert("🚨" + error),
      ()    => this.loading.importance = false
    )
  }

  add(): void{
    if(this.todoRegisterForm?.invalid) {
      alert("Error!! Please check form area.")
    }else{
      // this.store.dispatch(new TodoActions.Add({
      //   title:       this.todoRegisterForm?.value.todoTitle,
      //   category_id: Number(this.todoRegisterForm?.value.todoCategory), //Formから返るのはstringのためNumberを指定してあげると解決
      //   body:        this.todoRegisterForm?.value.todoBody,
      //   importance:  Number(this.todoRegisterForm?.value.todoImportance)
      // } as Todo)).subscribe(
      //   _     => _,
      //   error => alert("🚨" + error),
      //   ()    => this.goToTodoList()
      // );
    }
  }

  goToTodoList(): void {
    this.router.navigateByUrl('/todos');
  }
}
