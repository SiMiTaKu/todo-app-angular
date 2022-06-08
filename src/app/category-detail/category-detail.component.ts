import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }               from "@angular/router";
import { FormBuilder, FormGroup, Validators }   from "@angular/forms";

import { Category }          from "../category";
import { CategoryService }   from "../category.service";
import { CategoryActions }   from "../category.actions";
import { CategoryNgxsState } from "../category.state";
import { Color }             from "../color";

import { Select, Store } from "@ngxs/store";
import { Observable }    from "rxjs";

@Component({
  selector:    'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls:   ['./category-detail.component.scss']
})

export class CategoryDetailComponent implements OnInit {

  @Select(CategoryNgxsState.selectedCategory) category$?: Observable<Category>;

  categoryEditForm?: FormGroup;
  colors: Color[] = [];

  constructor(
    private route:           ActivatedRoute,
    private categoryService: CategoryService,
    private fb:              FormBuilder,
    private router:          Router,
    private changeDetector:  ChangeDetectorRef,
    private store:           Store
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.getColors();
  }

  get name()  { return this.categoryEditForm?.get('categoryName')}
  get slug()  { return this.categoryEditForm?.get('categorySlug')}
  get color() { return this.categoryEditForm?.get('categoryColor')}

  getCategory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(new CategoryActions.Select(id)).subscribe(
      _ => this.setCategoryData(_.categories.selectedCategory)
    )
  }

  getColors(): void {
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getThisCategoryColor(colorId: number): string[] {
    return this.colors.filter(_ => _.id == colorId).map(_ => _.name);
  }

  save(category: Category): void {
    this.store.dispatch(new CategoryActions.Update(
      {
        id:         category.id,
        name:       this.categoryEditForm?.value.categoryName,
        slug:       this.categoryEditForm?.value.categorySlug,
        color:      Number(this.categoryEditForm?.value.categoryColor),
        updated_at: category.updated_at,
        created_at: category.created_at
      }as Category)
    ).subscribe(
      _ => _,
      error => console.error(error),
      () => this.goToCategoryList()
    )
  }

  goToCategoryList() {
    this.router.navigate(['/categories'])
  }

  setCategoryData(category: Category) {
    this.categoryEditForm = this.fb.group({
      categoryName:  [category.name, Validators.required],
      categorySlug:  [category.slug, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      categoryColor: [category.color, Validators.required],
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
