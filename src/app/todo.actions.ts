import { Todo } from "./todo";

export module TodoActions{
  export const LOAD_TODO   = 'Load_Todo';
  export const SELECT_TODO = 'Select_Todo';
  export const ADD_TODO    = 'Add_Todo';

  export class Load{
    static readonly type = LOAD_TODO;
  }

  export class Select {
    static readonly type = SELECT_TODO;
    constructor(public id: number){ }
  }

  export class Add {
    static readonly type = ADD_TODO;
    constructor(public payload: Todo) {}
  }
}
