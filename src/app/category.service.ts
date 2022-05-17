import { Injectable }                from '@angular/core';
import { Router }                     from "@angular/router";
import { HttpClient, HttpHeaders }    from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError }     from "rxjs/operators";

import { Category } from "./category";
import { Color }    from "./color";
import { COLORS }   from "./mock-color";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API = {
    categoriesUrl: 'http://localhost:9000/api/category'
  }

  constructor(
    private http   : HttpClient,
    private router : Router
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCategories(): Observable<Category[]>{
    return this.http.get<[]>(this.API.categoriesUrl + "/list")
      .pipe(
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  getColors(): Observable<Color[]>{
    const  colors = of(COLORS)
    return colors;
  }

  getCategory(id: number): Observable<Category>{
    const url = `${this.API.categoriesUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      catchError(this.handleError<Category>('getCategory id = ${id}'))
    );
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.API.categoriesUrl, category, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.API.categoriesUrl + '/add', category, this.httpOptions).pipe(
      catchError(this.handleError<Category>('addCategory'))
    )
  }

  removeCategory(id: number): Observable<Category> {
    const url = `${this.API.categoriesUrl}/${id}`;
    return this.http.delete <Category>(url, this.httpOptions).pipe(
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`🚨 ${operation} filed: ${error.message} 🚨`);
      this.router.navigate(['/error']);
      return of(result as T);
    };
  }
}
