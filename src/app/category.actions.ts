import { Category } from "./category";

export module CategoryActions{
  export const LOAD_CATEGORY   = 'Load_Category';
  export const SELECT_CATEGORY = 'Select_Category';
  export const ADD_CATEGORY    = 'Add_Category';
  export const REMOVE_CATEGORY = 'Remove_Category';
  export const UPDATE_CATEGORY = 'Update_Category';

  export class Load{
    static readonly type = LOAD_CATEGORY;
  }

  export class Select {
    static readonly type = SELECT_CATEGORY;

    constructor(public id: number) {}
  }

  export class Add{
    static readonly type = ADD_CATEGORY;

    constructor(public payload: Category) {}
  }

  export class Remove{
    static readonly type = REMOVE_CATEGORY;

    constructor(public id: number){}
  }

  export class Update{
    static readonly type = UPDATE_CATEGORY;

    constructor(public payload: Category) {}
  }
}
