import { Component, OnInit }                  from '@angular/core';
import { ActivatedRoute, Router }             from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Category }        from "../category";
import { CategoryService } from "../category.service";
import {CategoryNgxsState} from "../category.state";
import { Color }           from "../color";

import { Store }              from "@ngxs/store";
import { Emittable, Emitter } from "@ngxs-labs/emitter";

@Component({
  selector:    'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls:   ['./category-detail.component.scss']
})

export class CategoryDetailComponent implements OnInit {

  //@Select(CategoryNgxsState.selectedCategory) category$?: Observable<Category>;

  categoryEditForm?: FormGroup;
  colors:    Color[] = [];
  category!: Category;

  loading = {
    "category" : true,
    "colors" :   true
  }
  constructor(
    private route:           ActivatedRoute,
    private categoryService: CategoryService,
    private fb:              FormBuilder,
    private router:          Router,
    private store:           Store
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.getColors();
  }

  get name()  { return this.categoryEditForm?.get('categoryName')}
  get slug()  { return this.categoryEditForm?.get('categorySlug')}
  get color() { return this.categoryEditForm?.get('categoryColor')}

  @Emitter(CategoryNgxsState.getCategory)
  private category$!: Emittable<number>

  getCategory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.category$.emit(id).subscribe(
      _ => { this.setCategoryData(_[0].categories.selectedCategory)
                   this.category = _[0].categories.selectedCategory},
        error => alert("🚨" + error),
        ()    =>  this.loading.category = false
      );
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

  @Emitter(CategoryNgxsState.updateCategory)
  private updateCategory$!: Emittable<Category>

  save(category: Category): void {
    this.updateCategory$.emit({
      id:         category.id,
      name:       this.categoryEditForm?.value.categoryName,
      slug:       this.categoryEditForm?.value.categorySlug,
      color:      Number(this.categoryEditForm?.value.categoryColor),
      updated_at: category.updated_at,
      created_at: category.created_at
    }as Category).subscribe(
      _ => _,
      error => console.error(error),
      () => this.goToCategoryList()
    )
  }

  setCategoryData(category: Category) {
    this.categoryEditForm = this.fb.group({
      categoryName:  [category.name, Validators.required],
      categorySlug:  [category.slug, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      categoryColor: [category.color, Validators.required],
    });
  }

  goToCategoryList() {
    this.router.navigate(['/categories'])
  }
}
