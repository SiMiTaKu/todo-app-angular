import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from "@angular/router";
import { TodosComponent }        from "./todos/todos.component";
import { HomeComponent }         from "./home/home.component";
import { TodoDetailComponent}    from "./todo-detail/todo-detail.component";
import { TodoRegisterComponent } from "./todo-register/todo-register.component";
import { CategoriesComponent }   from "./categories/categories.component";

const routes: Routes = [
  { path: ''             , redirectTo: '/home', pathMatch: 'full'},
  { path: 'home'         , component : HomeComponent },
  { path: 'todos'        , component : TodosComponent },
  { path: 'todos/:id'    , component : TodoDetailComponent },
  { path: 'todo/register', component : TodoRegisterComponent },
  { path: 'categories'   , component : CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
