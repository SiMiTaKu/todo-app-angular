import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { Category }                 from "../category";
import { CategoryService }          from "../category.service";
import { ActivatedRoute }           from "@angular/router";
import { Color }                    from "../color";
import { Router}                    from "@angular/router";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector:    'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls:   ['./category-detail.component.scss']
})

export class CategoryDetailComponent implements OnInit {
  @Input() category?: Category;

  categoryEditForm?: FormGroup;
  colors: Color[] = [];

  constructor(
    private route:           ActivatedRoute,
    private categoryService: CategoryService,
    private fb:              FormBuilder,
    private router:          Router,
    private changeDetector:  ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getCategory();
    this.getColors();
  }

  get name  (){ return this.categoryEditForm?.get('categoryName')}
  get slug  (){ return this.categoryEditForm?.get('categorySlug')}
  get color (){ return this.categoryEditForm?.get('categoryColor')}

  getCategory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategory(id).subscribe(_ => this.category = _);
  }

  getColors(): void{
    this.categoryService.getColors().subscribe(_ => this.colors = _);
  }

  getThisCategoryColor(colorId: number): string[]{
    return this.colors.filter(_ => _.id == colorId).map(_ => _.name);
  }

  save(): void{
    if(this.category){
      this.categoryService.updateCategory({
        id:    this.category.id,
        name:  this.categoryEditForm?.value.categoryName,
        slug:  this.categoryEditForm?.value.categorySlug,
        color: Number(this.categoryEditForm?.value.categoryColor),
      }).subscribe(
        () => this.goToCategoryList()
      )
    }
  }

  goToCategoryList(){
    this.router.navigate(['/categories'])
  }

  setCategoryData(){
    this.categoryEditForm = this.fb.group({
      categoryName:  [this.category?.name,  Validators.required],
      categorySlug:  [this.category?.slug,  [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      categoryColor: [this.category?.color,  Validators.required],
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
