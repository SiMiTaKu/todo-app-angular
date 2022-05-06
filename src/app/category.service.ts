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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
