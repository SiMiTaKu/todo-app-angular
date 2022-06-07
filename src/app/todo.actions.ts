export module TodoActions{
  export const LOAD_TODO = 'Load_Todo';
  export const SELECT_TODO = 'Select_Todo';

  export class Load{
    static readonly type = LOAD_TODO;
  }

  export class Select {
    static readonly type = SELECT_TODO;
    constructor(public id: number){ }
  }
}
