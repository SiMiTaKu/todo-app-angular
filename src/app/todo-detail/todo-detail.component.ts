import { Component, OnInit, Input } from '@angular/core';
import { CategoryService }          from "../category.service";
import { TodoService }              from "../todo.service";
import { Location }                 from "@angular/common";
import { ActivatedRoute }           from "@angular/router";
import { Todo }                     from "../todo";
import { Category }                 from "../category";
import { Color }                    from "../color";
import { TodoState }                from "../todoState";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  @Input() todo?: Todo;

  categories: Category[]  = [];
  colors:     Color[]     = [];
  states:     TodoState[] = [];
  category?:  string[];
  state?:     string[];

  constructor(
    private route:           ActivatedRoute,
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private location:        Location
  ) {}

  ngOnInit(): void {
    this.getTodo()
    this.getCategories()
    this.getColors()
    this.getStates()
    if(this.todo) this.getThisCategory(this.todo?.category_id)
    if(this.todo) this.getThisState(this.todo?.state)
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getTodo(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe(_ => this.todo = _);
  }

  getColors(){
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getStates(){
    this.todoService.getState().subscribe(_ => this.states = _)
  }

  getThisCategory(categoryId: number){
    this.category = this.categories.filter(_ => _.id == categoryId).map(_ => _.name)
  }

  getThisState(stateCode: number){
    this.state = this.states.filter(_ => _.id == stateCode).map(_ => _.status);
  }

  save(): void {
    if (this.todo) {
      this.todoService.updateTodo(this.todo)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
