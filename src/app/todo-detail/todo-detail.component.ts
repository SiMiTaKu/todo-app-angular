import { Todo }                     from "../todo";
import { TodoService }              from "../todo.service";
import { TodoState }                from "../todoState";
import { Category }                 from "../category";
import { CategoryService }          from "../category.service";
import { Color }                    from "../color";
import { Router }                   from "@angular/router";
import { ActivatedRoute }           from "@angular/router";
import { Location }                 from "@angular/common";

import {FormBuilder, FormGroup, Validators}          from "@angular/forms";
import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  @Input() todo?: Todo;
  todoEditForm?: FormGroup;

  categories: Category[]  = [];
  colors:     Color[]     = [];
  states:     TodoState[] = [];

  constructor(
    private route:           ActivatedRoute,
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private location:        Location,
    private router:          Router,
    private fb:              FormBuilder,
    private changeDetector:  ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getTodo()
    this.getCategories()
    this.getColors()
    this.getStates()
  }

  get title   (){ return this.todoEditForm?.get('todoTitle')}
  get body    (){ return this.todoEditForm?.get('todoBody')}
  get category(){ return this.todoEditForm?.get('todoCategory')}
  get state   (){ return this.todoEditForm?.get('todoState')}

  getCategories(): void {
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe(_ => this.todo = _);
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getStates(): void {
    this.todoService.getState().subscribe(_ => this.states = _)
  }

  getThisCategory(categoryId: number): string[] {
    return this.categories.filter(_ => _.id == categoryId).map(_ => _.name);
  }

  getThisState(stateCode: number): string[] {
    return this.states.filter(_ => _.id == stateCode).map(_ => _.status);
  }

  save(): void {
    if (this.todo) {
      this.todoService.updateTodo({
        id:          this.todo?.id,
        title:       this.todoEditForm?.value.todoTitle,
        body:        this.todoEditForm?.value.todoBody,
        category_id: Number(this.todoEditForm?.value.todoCategory),
        state:       Number(this.todoEditForm?.value.todoState),
      }).subscribe(
        () => this.goToTodoList()
      );
    }
  }

  setTodoData(): void{
    this.todoEditForm = this.fb.group({
      todoTitle:    [this.todo?.title,       Validators.required],
      todoBody:     [this.todo?.body,        Validators.required],
      todoCategory: [this.todo?.category_id, Validators.required],
      todoState:    [this.todo?.state,       Validators.required]
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  goToTodoList(): void {
    this.router.navigate(['/todos']);
  }
}
