import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _http: HttpClient
  ) { }

  commonUrl = 'https://todo-backend-a6j6.onrender.com'

  // http://localhost:3030

  addToDo(data: any) {
    return this._http.post(`${this.commonUrl}/todos`, data)
  }

  getTodo(): Observable<ITodoModel[]> {
    return this._http.get<ITodoModel[]>(`${this.commonUrl}/todos`)
  }

  getTodoDetails(id: string): Observable<ITodoModel> {
    return this._http.get<ITodoModel>(`${this.commonUrl}/todos/${id}`)
  }

  editTodo(data: ITodoModel, id: string) {
    return this._http.put(`${this.commonUrl}/todos/${id}`, data)
  }

  deleteTodo(id: string) {
    return this._http.delete(`${this.commonUrl}/todos/${id}`)
  }

  filterTodo(status?: string): Observable<ITodoModel> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this._http.get<ITodoModel>(`${this.commonUrl}/todo/filter`, { params });
  }

  exportTodo() {
    const headers = new HttpHeaders({ 'Content-Type': 'text/csv' });
    return this._http.get(`${this.commonUrl}/todo/download`, { headers, responseType: 'text' as 'json' });
  }

  importTodo(data: any) {
    return this._http.post(`${this.commonUrl}/todos/upload`, data)
  }

}

export interface ITodoModel {
  _id: string,
  name: string;
  description: string;
  status: string;
}

