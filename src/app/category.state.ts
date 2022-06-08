import { Category }                              from "./category";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable }                            from "@angular/core";
import { CategoryService }                       from "./category.service";
import { CategoryActions }                       from "./category.actions";
import { tap }                                   from "rxjs";

export class CategoryStateModel{
  selectedCategory?: Category;
  categories?: Category[];
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

  constructor(
    private categoryService: CategoryService
  ) {}

  @Selector()
  static categories(state: CategoryStateModel){
    return state.categories;
  }

  @Selector()
  static selectedCategory(state: CategoryStateModel){
    return state.selectedCategory;
  }

  @Action(CategoryActions.Load)
  load(ctx: StateContext<CategoryStateModel>){
    return this.categoryService.getCategories().pipe(
      tap((data) => {
        ctx.patchState({
          categories: data
        });
      })
    )
  }

  @Action(CategoryActions.Select)
  Select(ctx: StateContext<CategoryStateModel>, action: CategoryActions.Select){
    const id = action.id
    return this.categoryService.getCategory(id).pipe(
      tap((data) => {
        ctx.patchState({
          selectedCategory: data
        })
      })
    )
  }
}
