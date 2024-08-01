import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todoForm!: FormGroup
  subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _service: AppService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.todoForm = this._fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    })
  }

  saveTodo() {
    if (this.todoForm.invalid) {
      return
    } else {
      const data = this.todoForm.value
      this.subscribe.add(
        this._service.addToDo(data).subscribe({
          next: () => {
            this._router.navigate([''])
            this._snackBar.open('New ToDo Added..!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          },
          error: (err) => {
            console.log(err);
          }
        })
      )
    }
  }

  cancel() {
    throw new Error('Method not implemented.');
  }

}
