import { Injectable, Injector } from "@angular/core";

import { Category }        from "./category";
import { CategoryService } from "./category.service";

import { State, StateContext } from "@ngxs/store";
import { Receiver }            from "@ngxs-labs/emitter";
import { finalize, tap }       from "rxjs";

export class GetCategories{
  static readonly type = 'Get_Categories';
}

export class GetCategory{
  static readonly type = 'Get_Category';
  constructor(public payload: number) {}
}

export class AddCategory{
  static readonly type = 'Add_Category';
  constructor(public payload: Category) {}
}

export class RemoveCategory{
  static readonly type = 'Remove_Category';
  constructor(public payload: number) {}
}

export class UpdateCategory{
  static readonly type = 'Update_Category';
  constructor(public payload: Category) {}
}

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

  @Receiver({ action: GetCategories })
  static getCategories(
    { patchState }: StateContext<CategoryStateModel>,
    action: GetCategories
  ){
    return this.categoryService.getCategories().pipe(
      tap((data) => patchState({ categories: data }))
    )
  }

  @Receiver({ action: GetCategory })
  static getCategory(
    { patchState }: StateContext<CategoryStateModel>,
    action: GetCategory
  ){
    const id = action.payload
    return this.categoryService.getCategory(id).pipe(
      tap((data) => patchState({ selectedCategory: data }))
    )
  }

  @Receiver({ action: AddCategory })
  static addCategory(
    { patchState }: StateContext<CategoryStateModel>,
    action: AddCategory
  ){
    const category = action.payload
    return this.categoryService.addCategory(category).pipe(
      finalize(() => this.getCategories)
    )
  }

  @Receiver({ action: RemoveCategory })
  static removeCategory(
    { patchState } : StateContext<CategoryStateModel>,
    action: RemoveCategory
  ){
    const id = action.payload
    return this.categoryService.removeCategory(id).pipe(
      finalize (() => this.getCategories)
    )
  }

  @Receiver({ action: UpdateCategory})
  static updateCategory(
    { patchState } :StateContext<CategoryStateModel>,
    action: UpdateCategory
  ){
    const category = action.payload
    return this.categoryService.updateCategory(category).pipe(
      finalize(() => this.getCategories)
    )
  }
}
