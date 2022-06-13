import { Category }                              from "./category";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import {Injectable, Injector}                    from "@angular/core";
import { CategoryService }                       from "./category.service";
import { tap }                                   from "rxjs";
import {Receiver}                                from "@ngxs-labs/emitter";

export class GetCategories{
  static readonly type = 'Get_Categories';
}

export class GetCategory{
  static readonly type = 'Get_Category';
  constructor(public payload: number) {
  }
}

export interface CategoryStateModel{
  selectedCategory?: Category;
  categories: Category[];
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
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
}
