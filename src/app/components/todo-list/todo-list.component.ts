import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService, ITodoModel } from '../../services/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['no', 'name', 'decription', 'status', 'action'];
  dataSource = new MatTableDataSource<ITodoModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  subscribe = new Subscription();
  title = 'todo-app-frontend';
  statusFilter = 'all';
  selectedFile!: File | null;

  constructor(
    private _service: AppService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.subscribe.add(
      this._service.getTodo().subscribe({
        next: (res) => {
          this.dataSource.data = res
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  importCSV($event: any) {
    this.selectedFile = $event.target.files[0];
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name)

      this.subscribe.add(
        this._service.importTodo(formData).subscribe({
          next: () => {
            this.ngOnInit();
            this._snackBar.open('Imported Successfully..!', 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          },
          error: (err) => {
            this._snackBar.open(`${err.error.message}`, 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          }
        })
      )
    }
  }

  exportCSV() {
    this.subscribe.add(
      this._service.exportTodo().subscribe({
        next: (res: any) => {
          const blob = new Blob([res], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'todo_download.csv';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this._snackBar.open('Downloaded Successfully..!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        },
        error: (err) => {
          this._snackBar.open(`${err.error.error}`, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
      })
    )
  }


  deleteTodo(id: string) {
    this.subscribe.add(
      this._service.deleteTodo(id).subscribe({
        next: (res) => {
          this.ngOnInit()
          this._snackBar.open('Deleted..!', 'Close', {
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

  filterTasks() {
    this.subscribe.add(
      this._service.filterTodo(this.statusFilter).subscribe({
        next: (res: any) => {
          this.dataSource.data = res
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  viewTodo(id: string) {
    localStorage.setItem('selectedTodo', id)
    this._router.navigate(['view'])
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}

