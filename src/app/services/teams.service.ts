import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/data';
  getTeams(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  updateData(data: any, id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }
}
