import { Component, OnInit } from '@angular/core';
import { Category }          from "../category";
import { CategoryService }   from "../category.service";
import { Color }             from "../color";

@Component({
  selector:    'app-categories',
  templateUrl: './categories.component.html',
  styleUrls:   ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  colors:     Color[] = [];

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getColors(): void{
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getThisCategoryColor(colorId: number){
    return this.colors.filter(_ => _.id == colorId).map(_ => _.name);
  }
}
