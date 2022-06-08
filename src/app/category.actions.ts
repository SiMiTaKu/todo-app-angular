export module CategoryActions{
  export const LOAD_CATEGORY   = 'Load_Category';
  export const SELECT_CATEGORY = 'Category_Select';

  export class Load{
    static readonly type = LOAD_CATEGORY;
  }

  export class Select {
    static readonly type = SELECT_CATEGORY;

    constructor(public id: number) {
    }
  }
}
