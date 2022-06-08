import { Component, OnInit }                   from '@angular/core';
import { Category }                            from "../category";
import { CategoryService }                     from "../category.service";
import { Color }                               from "../color";
import { TodoService }                         from "../todo.service";
import { Todo }                                from "../todo";
import {Select, Store}                         from "@ngxs/store";
import {CategoryActions}                       from "../category.actions";
import {CategoryNgxsState, CategoryStateModel} from "../category.state";
import {Observable}                            from "rxjs";
import {TodoActions}                           from "../todo.actions";

@Component({
  selector: 'app-categories', templateUrl: './categories.component.html', styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Select(CategoryNgxsState.categories) categories$?: Observable<Category[]>

  colors:     Color[]    = [];
  todos:      Todo[]     = [];

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
    this.store.dispatch(CategoryActions.Load)
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getTodos(): void {
    this.store.dispatch(TodoActions.Load);
  }

  getThisCategoryColor(colorId: number): string[] {
    return this.colors.filter(_ => _.id == colorId).map(_ => _.name);
  }

  remove(category: Category): void {
    this.categoryService.removeCategory(category.id).subscribe();
    this.removeMatchCategory(category.id);
  }

  removeMatchCategory(categoryId: number): void {
    const matchIds = this.todos.filter(_ => _.category_id == categoryId).map(_ => _.id);
    matchIds.map(id => this.todoService.removeTodo(id).subscribe());
  }

  convertDateTime(dateTime: Date): string {
    return new Intl.DateTimeFormat('ja-Jp-u-ca-japanese', {
      month: "long", day: "numeric", hour: "numeric", minute: "numeric"
    }).format(new Date(dateTime));
  }

  // //id順にソート
  // sortById(): void{
  //   this.categories.sort(
  //     (categoryA, categoryB) => categoryA.id - categoryB.id
  //   )
  // }
  // //新しい順にソート
  // sortByDate(): void{
  //   this.categories.sort(
  //     (categoryA, categoryB) => new Date(categoryB.updated_at).getTime() - new Date(categoryA.updated_at).getTime()
  //   )
  // }
}
