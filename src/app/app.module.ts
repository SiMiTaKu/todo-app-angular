import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }        from './app.component';
import { AppRoutingModule }    from './app-routing.module';
import { TodosComponent }      from './todos/todos.component';
import { HomeComponent }       from './home/home.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';

import { FormsModule }         from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    HomeComponent,
    TodoDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
