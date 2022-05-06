import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent }       from "./todos/todos.component";
import { HomeComponent }        from "./home/home.component";
import { TodoDetailComponent}   from "./todo-detail/todo-detail.component";

const routes: Routes = [
  { path: ''          ,redirectTo: '/home', pathMatch: 'full'},
  { path: 'home'      ,component : HomeComponent },
  { path: 'todos'     ,component : TodosComponent },
  { path: 'todos/:id' ,component : TodoDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
