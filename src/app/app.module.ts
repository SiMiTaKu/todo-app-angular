import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }          from './app.component';
import { AppRoutingModule }      from './app-routing.module';
import { TodosComponent }        from './todos/todos.component';
import { HomeComponent }         from './home/home.component';
import { TodoDetailComponent }   from './todo-detail/todo-detail.component';
import { TodoRegisterComponent } from './todo-register/todo-register.component';
import { CategoriesComponent }   from './categories/categories.component';
import { ErrorComponent }        from './error/error.component';

import { FormsModule, ReactiveFormsModule} from "@angular/forms";
// import { HttpClientInMemoryWebApiModule }  from "angular-in-memory-web-api";
// import { InMemoryDataService }             from './in-memory-data.service';
import { HttpClientModule }                from "@angular/common/http";
import { CategoryDetailComponent }         from './category-detail/category-detail.component';
import { CategoryRegisterComponent }       from './category-register/category-register.component';

import { NgxsModule }                    from "@ngxs/store";
import { NgxsLoggerPluginModule }        from "@ngxs/logger-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { TodoNgxsState }                 from "./todo.state";
import { CategoryNgxsState }             from "./category.state";
import {NgxsEmitPluginModule}            from "@ngxs-labs/emitter";

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    HomeComponent,
    TodoDetailComponent,
    TodoRegisterComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    CategoryRegisterComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false}
    // ),
    ReactiveFormsModule,
    NgxsModule.forRoot([
      TodoNgxsState,
      CategoryNgxsState //ここでDIしている
    ]),
    NgxsEmitPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

