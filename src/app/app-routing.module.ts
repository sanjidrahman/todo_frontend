import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ViewTodoComponent } from './components/view-todo/view-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', title: 'ToDo List', component: TodoListComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'add', title: 'Add ToDo', component: AddTodoComponent },
  { path: 'view', title: 'ToDo Details', component: ViewTodoComponent },
  { path: 'edit', title: 'Edit ToDo', component: EditTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
