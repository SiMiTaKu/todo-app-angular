import {Component, OnInit} from '@angular/core';
import {Category}          from "../category";
import {CategoryService}   from "../category.service";
import {Color}             from "../color";
import {TodoService}       from "../todo.service";
import {Todo}              from "../todo";

@Component({
  selector: 'app-categories', templateUrl: './categories.component.html', styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  colors:     Color[]    = [];
  todos:      Todo[]     = [];

  constructor(private categoryService: CategoryService, private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
    this.getTodos();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(_ => this.categories = _, error => console.log(error), () => this.categories.map(category => this.setDateTime(category)));
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(_ => this.todos = _);
  }

  getThisCategoryColor(colorId: number): string[] {
    return this.colors.filter(_ => _.id == colorId).map(_ => _.name);
  }

  remove(category: Category): void {
    this.categories = this.categories.filter(_ => _ !== category);
    this.categoryService.removeCategory(category.id).subscribe();
    this.removeMatchCategory(category.id);
  }

  removeMatchCategory(categoryId: number): void {
    const matchIds = this.todos.filter(_ => _.category_id == categoryId).map(_ => _.id);
    matchIds.map(id => this.todoService.removeTodo(id).subscribe());
  }

  setDateTime(category: Category): void {
    category.updated_at = (new Intl.DateTimeFormat('ja-Jp-u-ca-japanese', {
      month: "long", day: "numeric", hour: "numeric", minute: "numeric"
    }).format(new Date(category.updated_at)));
    category.created_at = (new Intl.DateTimeFormat('ja-Jp-u-ca-japanese', {
      month: "long", day: "numeric", hour: "numeric", minute: "numeric"
    }).format(new Date(category.created_at)));
  }
}
