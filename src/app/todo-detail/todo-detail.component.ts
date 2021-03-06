import { Todo }            from "../todo";
import { TodoNgxsState }   from "../todo.state";
import { TodoService }     from "../todo.service";
import { TodoState }       from "../todoState";
import { TodoImportance }  from "../todoImportance";

import { Category }                              from "../category";
import { CategoryService }                       from "../category.service";
import { CategoryNgxsState, CategoryStateModel } from "../category.state";
import { Color }                                 from "../color";

import { Router }                             from "@angular/router";
import { ActivatedRoute }                     from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit }                  from '@angular/core';

import { Emittable, Emitter } from "@ngxs-labs/emitter";

@Component({
  selector: 'app-todo-detail', templateUrl: './todo-detail.component.html', styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todoEditForm?: FormGroup;

  categories:    Category[]       = [];
  colors:        Color[]          = [];
  states:        TodoState[]      = [];
  importanceSeq: TodoImportance[] = [];

  todo!: Todo

  loading = {
    "setTodoData": true,
    "categories":  true,
    "colors":      true,
    "states":      true,
    "importance":  true,
  }

  constructor(
    private route:           ActivatedRoute,
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private router:          Router,
    private fb:              FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getTodo()
    this.getCategories()
    this.getColors()
    this.getStates()
    this.getImportance()
  }

  //formの内容取得メソッド
  get title(){       return this.todoEditForm?.get('todoTitle')}
  get body(){        return this.todoEditForm?.get('todoBody')}
  get category() {   return this.todoEditForm?.get('todoCategory')}
  get state() {      return this.todoEditForm?.get('todoState')}
  get importance() { return this.todoEditForm?.get('todoImportance')}

  @Emitter(TodoNgxsState.getTodo)
  private todo$!: Emittable<number>

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todo$.emit(id).subscribe(
      _     => { this.setTodoData(_.todos.selectedTodo)
                       this.todo = _.todos.selectedTodo},
      error => alert("🚨" + error),
      ()    =>  this.loading.setTodoData = false
    )
  }

  @Emitter(CategoryNgxsState.getCategories)
  private categories$!: Emittable<CategoryStateModel>

  getCategories(): void {
    this.categories$.emit({ categories: [] }).subscribe(
      _     => this.categories = _.categories.categories,
      error => alert("🚨" + error),
      ()    =>  this.loading.categories = false
    );
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

  getThisCategory(categoryId: number): string[] {
    return this.categories.filter(_ => _.id == categoryId).map(_ => _.name);
  }

  getThisState(stateCode: number): string[] {
    return this.states.filter(_ => _.id == stateCode).map(_ => _.status);
  }

  getThisImportance(code: number): string[] {
    return this.importanceSeq.filter(_ => _.code == code).map(_ => _.name);
  }

  @Emitter(TodoNgxsState.updateTodo)
  private updateTodo$!: Emittable<Todo>

  save(todo: Todo): void {
    this.updateTodo$.emit({
      id:          todo.id,
      title:       this.todoEditForm?.value.todoTitle,
      body:        this.todoEditForm?.value.todoBody,
      category_id: Number(this.todoEditForm?.value.todoCategory),
      state:       Number(this.todoEditForm?.value.todoState),
      importance:  Number(this.todoEditForm?.value.todoImportance),
      updated_at:  todo.updated_at,
      created_at:  todo.created_at
    } as Todo).subscribe(
      _     => _,
      error => error,
      ()    => this.goToTodoList()
    );
  }

  //form初期値セット
  setTodoData(todo: Todo): void {
    this.todoEditForm = this.fb.group({
      todoTitle:      [todo.title,       Validators.required],
      todoBody:       [todo.body,        Validators.required],
      todoCategory:   [todo.category_id, Validators.required],
      todoState:      [todo.state,       Validators.required],
      todoImportance: [todo.importance,  Validators.required]
    });
  }

  goToTodoList(): void {
    this.router.navigate(['/todos']);
  }
}

