import { Injectable }    from '@angular/core';
import { CATEGORIES }    from "./mock-category";
import { Category }      from "./category";
import { Observable, of} from "rxjs";
import {Color} from "./color";
import {COLORS} from "./mock-color";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Observable<Category[]>{
    const  categories = of(CATEGORIES);
    return categories;
  }

  getColors(): Observable<Color[]>{
    const  colors = of(COLORS)
    return colors;
  }
}
