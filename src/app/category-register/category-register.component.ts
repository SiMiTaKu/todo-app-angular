import { Component, OnInit } from '@angular/core';
import { Category }          from "../category";
import { Color }             from "../color";
import { CategoryService }   from "../category.service";
import { Router }            from "@angular/router";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector:    'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls:   ['./category-register.component.scss']
})
export class CategoryRegisterComponent implements OnInit {
  categories: Category[] = [];
  colors:     Color[]    = [];

  categoryRegisterForm?: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb:              FormBuilder,
    private router:          Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
    this.categoryRegisterForm = this.fb.group({
      categoryName:  ['',  Validators.required],
      categorySlug:  ['',  Validators.required],
      categoryColor: ['',  Validators.required],
    });
  }

  get name  (){ return this.categoryRegisterForm?.get('categoryName')}
  get slug  (){ return this.categoryRegisterForm?.get('categorySlug')}
  get color (){ return this.categoryRegisterForm?.get('categoryColor')}

  getCategories(): void {
    this.categoryService.getCategories().subscribe(_ => this.categories = _);
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  add(): void {
    if(this.categoryRegisterForm?.invalid) {
      alert("Error!! Please check form area.")
    }else{
      this.categoryService.addCategory({
        name:  this.categoryRegisterForm?.value.categoryName,
        slug:  this.categoryRegisterForm?.value.categorySlug,
        color: Number(this.categoryRegisterForm?.value.categoryColor),
      } as Category).subscribe(
        category  => this.categories.push(category),
        error     => alert(error),
        ()        => this.goToCategoryList()
      );
    }
  }

  goToCategoryList(){
    this.router.navigate(['/categories'])
  }
}
