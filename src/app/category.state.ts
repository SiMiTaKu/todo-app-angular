import { Injectable, Injector } from "@angular/core";

import { Category }        from "./category";
import { CategoryService } from "./category.service";

import { State, StateContext }   from "@ngxs/store";
import {EmitterAction, Receiver} from "@ngxs-labs/emitter";
import { finalize, tap }         from "rxjs";

export interface CategoryStateModel{
  categories:        Category[];
  selectedCategory?: Category;
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories:       [],
    selectedCategory: undefined
  }
})
@Injectable()
export class CategoryNgxsState{

  private static categoryService: CategoryService

  constructor(
    private injector: Injector
  ) {
    CategoryNgxsState.categoryService = injector.get<CategoryService>(CategoryService)
  }

  @Receiver({ type: '[Category] Get Categories' })
  static getCategories(
    { patchState }: StateContext<CategoryStateModel>,
  ){
    return this.categoryService.getCategories().pipe(
      tap((data) => patchState({ categories: data }))
    )
  }

  @Receiver({ type : '[Category] Get Category'})
  static getCategory(
    { patchState }: StateContext<CategoryStateModel>,
    action: EmitterAction<number>
  ){
    const id = action.payload
    return this.categoryService.getCategory(id).pipe(
      tap((data) => patchState({ selectedCategory: data }))
    )
  }

  @Receiver({ type: '[Category] Add Category'})
  static addCategory(
    { patchState }: StateContext<CategoryStateModel>,
    action: EmitterAction<Category>
  ){
    const category = action.payload
    return this.categoryService.addCategory(category).pipe(
      finalize(() => this.getCategories)
    )
  }

  @Receiver({ type: '[Category] Remove Category' })
  static removeCategory(
    { patchState } : StateContext<CategoryStateModel>,
    action: EmitterAction<number>
  ){
    const id = action.payload
    return this.categoryService.removeCategory(id).pipe(
      finalize (() => this.getCategories)
    )
  }

  @Receiver({ type: '[Category] Update Category'})
  static updateCategory(
    { patchState } :StateContext<CategoryStateModel>,
    action: EmitterAction<Category>
  ){
    const category = action.payload
    return this.categoryService.updateCategory(category).pipe(
      finalize(() => this.getCategories)
    )
  }
}
