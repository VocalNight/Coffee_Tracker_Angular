import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoffeeTrackerHttpService {

  private apiUrl = "https://localhost:7036/api"

  getApiRoute() {
    return this.apiUrl;
  }

  constructor(private http: HttpClient) { }

  getRecords(model: string, id?: number): Observable<any> {
    if (id) {
      return this.http.get<any>(`${this.apiUrl}/${model}/${id}`);
    }
    return this.http.get<any>(`${this.apiUrl}/${model}`);
  }

  postItem(item: any, model: string, route: Router) {
    this.http.post(`${this.apiUrl}/${model}`, item)
      .subscribe({
        next: (r) => {
          setTimeout(() => 
          {
            route.navigate([model]);
          },
            1000);
        },
        error: (e) => { 
          //this.dialog.open(DialogQuote, {data: e.error})
          console.log(e);
        }
      })
  }

  updateItem(item: any, model: string) {

    this.http.put(`${this.apiUrl}/${model}/${item.id}`, item)
      .subscribe({
        next: (r) => console.log("Api sucess", r),
        error: (e) => console.error("Api error", e)
      })
  }

  deleteRow(id: number, model: string) {

    this.http.delete(`${this.apiUrl}/${model}/${id}`)
      .subscribe({
        next: (r) => {
          console.log("Api sucess", r);
        },
        error: (e) => console.error("Api error", e)
      })
  }
}
