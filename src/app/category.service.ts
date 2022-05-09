import { Injectable }    from '@angular/core';
import { Category }      from "./category";
import { Observable, of} from "rxjs";
import { Color }         from "./color";
import { COLORS }        from "./mock-color";
import { catchError }    from "rxjs/operators";

import { HttpClient, HttpHeaders }    from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'api/categories';

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCategories(): Observable<Category[]>{
    return this.http.get<[]>(this.categoriesUrl)
      .pipe(
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  getColors(): Observable<Color[]>{
    const  colors = of(COLORS)
    return colors;
  }

  getCategory(id: number): Observable<Category>{
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      catchError(this.handleError<Category>('getCategory id = ${id}'))
    );
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.categoriesUrl, category, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions).pipe(
      catchError(this.handleError<Category>('addCategory'))
    )
  }

  removeCategory(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.delete <Category>(url, this.httpOptions).pipe(
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
