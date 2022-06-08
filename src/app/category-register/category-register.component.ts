import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Component, OnInit }                from '@angular/core';
import { Router }                           from "@angular/router";

import { Category }        from "../category";
import { CategoryService } from "../category.service";
import { CategoryActions } from "../category.actions";
import { Color }           from "../color";

import { Store }         from "@ngxs/store";

@Component({
  selector:    'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls:   ['./category-register.component.scss']
})
export class CategoryRegisterComponent implements OnInit {
  colors: Color[] = [];

  categoryRegisterForm?: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb:              FormBuilder,
    private router:          Router,
    private store:           Store
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
    this.categoryRegisterForm = this.fb.group({
      categoryName:  ['',  Validators.required],
      categorySlug:  ['',  [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      categoryColor: ['',  Validators.required],
    });
  }

  get name  (){ return this.categoryRegisterForm?.get('categoryName')}
  get slug  (){ return this.categoryRegisterForm?.get('categorySlug')}
  get color (){ return this.categoryRegisterForm?.get('categoryColor')}

  getCategories(): void {
    this.store.dispatch(new CategoryActions.Load)
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  add(): void {
    if(this.categoryRegisterForm?.invalid) {
      alert("Error!! Please check form area.")
    }else{
      this.store.dispatch(new CategoryActions.Add({
        name:  this.categoryRegisterForm?.value.categoryName,
        slug:  this.categoryRegisterForm?.value.categorySlug,
        color: Number(this.categoryRegisterForm?.value.categoryColor),
    } as Category)).subscribe(
        _     => _,
        error => alert(error),
        ()    => this.goToCategoryList()
      );
    }
  }

  goToCategoryList(){
    this.router.navigate(['/categories'])
  }
}
