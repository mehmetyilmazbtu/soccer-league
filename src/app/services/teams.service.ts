import { Injectable } from '@angular/core';
import { Teams } from '../interfaces/teams';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private http : HttpClient
  ) { }

  getTeams() {
    return this.http.get<any>('assets/teams.json')
    .toPromise()
    .then(res => <Teams[]>res.data)
    .then(data => { return data; });
}
}
