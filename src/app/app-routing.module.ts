import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent }       from "./todos/todos.component";
import { HomeComponent }        from "./home/home.component";

const routes: Routes = [
  { path: ''     , component: HomeComponent},
  { path: 'todos', component: TodosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
