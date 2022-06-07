import {Todo}            from "../todo";
import {TodoService}     from "../todo.service";
import {TodoState}       from "../todoState";
import {Category}        from "../category";
import {CategoryService} from "../category.service";
import {Color}           from "../color";
import {Router}          from "@angular/router";
import {ActivatedRoute}  from "@angular/router";
import {Location}        from "@angular/common";

import {FormBuilder, FormGroup, Validators}          from "@angular/forms";
import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {TodoImportance}                              from "../todoImportance";
import {Select, Store}                               from "@ngxs/store";
import {TodoActions}                                 from "../todo.actions";
import {TodoNgxsState}                               from "../todo.state";
import {Observable}                                  from "rxjs";

@Component({
  selector: 'app-todo-detail', templateUrl: './todo-detail.component.html', styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  @Select(TodoNgxsState.selectedTodo) todo$?: Observable<Todo>
  todo?: Todo;

  todoEditForm?: FormGroup;

  categories:    Category[]       = [];
  colors:        Color[]          = [];
  states:        TodoState[]      = [];
  importanceSeq: TodoImportance[] = []

  constructor(
    private route:           ActivatedRoute,
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private location:        Location,
    private router:          Router,
    private fb:              FormBuilder,
    private changeDetector:  ChangeDetectorRef,
    private store:           Store
  ) {}

  ngOnInit(): void {
    this.getTodo()
    this.getCategories()
    this.getColors()
    this.getStates()
    this.getImportance()
  }

  get title() {
    return this.todoEditForm?.get('todoTitle')
  }

  get body() {
    return this.todoEditForm?.get('todoBody')
  }

  get category() {
    return this.todoEditForm?.get('todoCategory')
  }

  get state() {
    return this.todoEditForm?.get('todoState')
  }

  get importance() {
    return this.todoEditForm?.get('todoImportance')
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(new TodoActions.Select(id)).subscribe(
      _ => this.todo = _,
      error => console.error(error),
      () => console.log("これ" + this.todo)
    )
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getStates(): void {
    this.todoService.getState().subscribe(_ => this.states = _)
  }

  getImportance(): void {
    this.todoService.getImportance().subscribe(_ => this.importanceSeq = _)
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

  save(todo: Todo): void {
    this.store.dispatch(new TodoActions.Update({
      id:          todo.id,
      title:       this.todoEditForm?.value.todoTitle,
      body:        this.todoEditForm?.value.todoBody,
      category_id: Number(this.todoEditForm?.value.todoCategory),
      state:       Number(this.todoEditForm?.value.todoState),
      importance:  Number(this.todoEditForm?.value.todoImportance),
      updated_at:  todo.updated_at,
      created_at:  todo.created_at
    } as Todo)).subscribe(
      _ => _,
      error => error,
      () => this.goToTodoList()
    );
  }

  setTodoData(todo: Todo): void {
    this.todoEditForm = this.fb.group({
      todoTitle:      [todo.title, Validators.required],
      todoBody:       [todo.body, Validators.required],
      todoCategory:   [todo.category_id, Validators.required],
      todoState:      [todo.state, Validators.required],
      todoImportance: [todo.importance, Validators.required]
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  goToTodoList(): void {
    this.router.navigate(['/todos']);
  }
}
