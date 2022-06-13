import { Component, OnInit } from '@angular/core';

import { Category }         from "../category";
import { CategoryActions }  from "../category.actions";
import { CategoryNgxsState} from "../category.state";
import { CategoryService }  from "../category.service";
import { Color }            from "../color";

import { Todo }        from "../todo";
import { TodoService } from "../todo.service";

import { Select, Store } from "@ngxs/store";
import { Observable }    from "rxjs";

@Component({
  selector: 'app-categories', templateUrl: './categories.component.html', styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Select(CategoryNgxsState.categories) categories$?: Observable<Category[]>

  categories: Category[] = [];
  colors:     Color[]    = [];
  todos:      Todo[]     = [];

  loading = {
    "categories" : true,
    "todos" :      true,
    "colors" :     true,

  }

  constructor(
    private categoryService: CategoryService,
    private todoService:     TodoService,
    private store:           Store
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
    this.getTodos();
  }

  getCategories(): void {
    this.store.dispatch(CategoryActions.Load).subscribe(
      _     => this.categories = _.categories.categories,
      error => alert("🚨" + error),
      ()    =>  this.loading.categories = false
    );
  }

  getTodos(): void {
    // this.store.dispatch(TodoActions.Load).subscribe(
    //   _     => _,
    //   error => alert("🚨" + error),
    //   ()    =>  this.loading.todos = false
    // );
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(
      _     => this.colors = _,
      error => alert("🚨" + error),
      ()    =>  this.loading.colors = false
    );
  }

  getThisCategoryColor(colorId: number): string[] {
    return this.colors.filter(_ => _.id == colorId).map(_ => _.name);
  }

  remove(category: Category): void {
    this.store.dispatch(new CategoryActions.Remove(category.id))
    this.removeMatchCategory(category.id);
  }

  removeMatchCategory(categoryId: number): void {
    // const matchIds = this.todos.filter(_ => _.category_id == categoryId).map(_ => _.id);
    // matchIds.map(id => this.store.dispatch(new TodoActions.Remove(id)))
  }

  convertDateTime(dateTime: Date): string {
    return new Intl.DateTimeFormat('ja-Jp-u-ca-japanese', {
      month: "long", day: "numeric", hour: "numeric", minute: "numeric"
    }).format(new Date(dateTime));
  }

  //id順にソート
  sortById(): void{
    this.categories.sort(
      (categoryA, categoryB) => categoryA.id - categoryB.id
    )
  }

  //新しい順にソート
  sortByDate(): void{
    this.categories.sort(
      (categoryA, categoryB) => new Date(categoryB.updated_at).getTime() - new Date(categoryA.updated_at).getTime()
    )
  }
}
