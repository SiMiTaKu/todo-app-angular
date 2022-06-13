import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Component, OnInit }                from '@angular/core';
import { Router }                           from "@angular/router";

import { Category }           from "../category";
import { CategoryService }    from "../category.service";
import { CategoryNgxsState }  from "../category.state";
import { Color }              from "../color";

import { Store }              from "@ngxs/store";
import { Emittable, Emitter } from "@ngxs-labs/emitter";

@Component({
  selector:    'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls:   ['./category-register.component.scss']
})
export class CategoryRegisterComponent implements OnInit {
  colors: Color[] = [];

  categoryRegisterForm?: FormGroup;

  loading = true;

  constructor(
    private categoryService: CategoryService,
    private fb:              FormBuilder,
    private router:          Router,
    private store:           Store
  ) { }

  ngOnInit(): void {
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


  getColors(): void {
    this.categoryService.getColors().subscribe(
      _     => this.colors = _,
      error => alert("🚨" + error),
      ()    =>  this.loading = false
    );
  }

  @Emitter(CategoryNgxsState.addCategory)
  private addCategory$!: Emittable<Category>

  add(): void {
    if(this.categoryRegisterForm?.invalid) {
      alert("Error!! Please check form area.")
    }else{
      this.addCategory$.emit(({
        name:  this.categoryRegisterForm?.value.categoryName,
        slug:  this.categoryRegisterForm?.value.categorySlug,
        color: Number(this.categoryRegisterForm?.value.categoryColor),
    } as Category)).subscribe(
        _     => _,
        error => alert("🚨" + error),
        ()    => this.goToCategoryList()
      );
    }
  }

  goToCategoryList(){
    this.router.navigate(['/categories'])
  }
}
