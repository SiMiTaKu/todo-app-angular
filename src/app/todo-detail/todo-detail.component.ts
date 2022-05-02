import { Component, OnInit, Input } from '@angular/core';
import { TodoService }              from "../todo.service";
import { Location }                 from "@angular/common";
import { ActivatedRoute }           from "@angular/router";
import { Todo }                     from "../todo";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  @Input() todo?: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTodo()
  }

  getTodo(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe(_ => this.todo = _)
  }
}
