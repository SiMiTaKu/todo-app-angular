import { Injectable }        from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Todo }              from "./todo";
import { Category }          from "./category";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const todos = [
      { id: 1,  category_id: 1, title: 'abcde', body: 'sj6uj', state: 1 },
      { id: 2,  category_id: 2, title: 'asdlk', body: 'ertue', state: 3 },
      { id: 3,  category_id: 3, title: 'adhsf', body: 'seyer', state: 2 },
      { id: 4,  category_id: 1, title: 'abrhe', body: 'mtyu6', state: 3 },
      { id: 5,  category_id: 2, title: 'agsga', body: 'shse5', state: 2 },
      { id: 6,  category_id: 3, title: 'sjyjh', body: 'sdfhs', state: 1 },
      { id: 7,  category_id: 1, title: 'shstt', body: 'zfhsj', state: 1 },
      { id: 8,  category_id: 2, title: 'dgggg', body: '5555s', state: 2 },
      { id: 9,  category_id: 3, title: 'djdjd', body: 'shshs', state: 3 },
      { id: 10, category_id: 1, title: 'dfjdt', body: 'ABCDE', state: 2 },
    ];

    const categories = [
      {id: 1, name: 'インフラ', 　　slug: "インフラ周り", 　　color: 2 },
      {id: 2, name: 'フロント', 　　slug: "フロント周り", 　　color: 3 },
      {id: 3, name: 'バックエンド', slug: "バックエンド周り", color: 1 },
    ];

    return {todos, categories};
  }

  genTodoId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id))+ 1 : 11;
  }

  genCategoryId(categories: Category[]): number {
    return categories.length > 0 ? Math.max(...categories.map(category => category.id))+ 1 : 11;
  }
}
