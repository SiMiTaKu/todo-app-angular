import {Component, Input, OnInit} from '@angular/core';
import {Category}                 from "../category";
import {CategoryService}          from "../category.service";
import {ActivatedRoute}           from "@angular/router";
import {Color}                    from "../color";

@Component({
  selector:    'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls:   ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  @Input() category?: Category;

  colors: Color[] = [];

  constructor(
    private route:           ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategory();
    this.getColors();
  }

  getCategory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategory(id).subscribe(_ => this.category = _);
  }

  getColors(): void{
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getThisCategoryColor(colorId: number){
    return this.colors.filter(_ => _.id == colorId).map(_ => _.name);
  }
}
