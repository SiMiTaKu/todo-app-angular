import { Category } from "./category";

export module CategoryActions{
  export const LOAD_CATEGORY   = 'Load_Category';
  export const SELECT_CATEGORY = 'Select_Category';
  export const ADD_CATEGORY    = 'Add_Category';

  export class Load{
    static readonly type = LOAD_CATEGORY;
  }

  export class Select {
    static readonly type = SELECT_CATEGORY;

    constructor(public id: number) {
    }
  }

  export class Add{
    static readonly type = ADD_CATEGORY;

    constructor(public payload: Category) {}
  }
}
