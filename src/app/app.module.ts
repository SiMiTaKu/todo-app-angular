import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }          from './app.component';
import { AppRoutingModule }      from './app-routing.module';
import { TodosComponent }        from './todos/todos.component';
import { HomeComponent }         from './home/home.component';
import { TodoDetailComponent }   from './todo-detail/todo-detail.component';
import { TodoRegisterComponent } from './todo-register/todo-register.component';
import { CategoriesComponent }   from './categories/categories.component';

import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientInMemoryWebApiModule }  from "angular-in-memory-web-api";
import { InMemoryDataService }             from './in-memory-data.service';
import { HttpClientModule }                from "@angular/common/http";
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    HomeComponent,
    TodoDetailComponent,
    TodoRegisterComponent,
    CategoriesComponent,
    CategoryDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

