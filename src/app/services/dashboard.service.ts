import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  http: HttpClient = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  private searchSubject = new BehaviorSubject<string>(
    sessionStorage.getItem('dashboardSearch') || ''
  );
  search$ = this.searchSubject.asObservable();

  getDashboardData(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getUserById(id: number | string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  setSearch(value: string) {
    this.searchSubject.next(value);
    sessionStorage.setItem('dashboardSearch', value);
  }

}
