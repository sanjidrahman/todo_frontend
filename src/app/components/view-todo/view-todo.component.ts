import { Component, OnInit } from '@angular/core';
import { AppService, ITodoModel } from '../../services/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent implements OnInit {

  todo!: ITodoModel
  subscription = new Subscription()
  selectedTodo: any

  constructor(
    private _service: AppService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.selectedTodo = localStorage.getItem('selectedTodo')
    if (this.selectedTodo)
      this.subscription.add(
        this._service.getTodoDetails(this.selectedTodo).subscribe({
          next: (res) => {
            this.todo = res
          },
          error: (err) => {
            console.log(err);
          }
        })
      )
  }

  editTodo() {
    this._router.navigate(['edit'])
  }

}
