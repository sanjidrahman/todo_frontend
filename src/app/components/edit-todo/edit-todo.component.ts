import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService, ITodoModel } from '../../services/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit, OnDestroy {

  todo!: ITodoModel
  subscription = new Subscription()
  selectedTodo: any

  constructor(
    private _service: AppService,
    private _router: Router,
    private _snackBar: MatSnackBar,
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

  saveTodo() {
    console.log(this.todo);
    this.subscription.add(
      this._service.editTodo(this.todo, this.selectedTodo).subscribe({
        next: () => {
          this._router.navigate(['view']);
          this._snackBar.open('Edited ToDo', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        },
        error: (err) => {
          console.log(err.error.message);
          this._snackBar.open(`${err.error.message}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
      })
    )
  }

  cancel() {
    this._router.navigate(['view'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
