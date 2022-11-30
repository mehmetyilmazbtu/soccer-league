import { Component, OnInit } from '@angular/core';
import { Teams } from '../interfaces/teams';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  teams: Teams[];
  cols: any;
  matchesOfWeek = [];
  week: number = 0;

  constructor(private teamsService: TeamsService) {}
  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
     this.teamsService.getTeams().then((data) => {
      this.teams = data;
      this.fiksturAlgoritmasi(this.teams);
    });
    this.cols = [
      { field: 'takim', header: 'Takım' },
      { field: 'oynananMac', header: 'OM' },
      { field: 'beraberlik', header: 'B' },
      { field: 'maglubiyet', header: 'M' },
      { field: 'atilanGol', header: 'AG' },
      { field: 'yenilenGol', header: 'YG' },
      { field: 'avaraj', header: 'A' },
      { field: 'puan', header: 'P' },
    ];
  }
  goal() {
    let goals = Math.floor(Math.random() * (4 - 0 + 1) + 0);
    return goals;
  }

  fiksturAlgoritmasi(teams) {
    let teamArray = [];
    for (let i = 0; i < teams.length; i++) {
      teamArray.push(teams[i].takim);
    }
    const constTeam = teamArray[teams.length - 1];
    teamArray.pop();

    let shiftArray = [];

    for (let i = 0; i < teamArray.length; i++) {
      shiftArray.push(i);
    }

    for(let i=0;i<2;i++){
    for (let i = 0; i < teamArray.length; i++) {
      this.matchesOfWeek.push(
        constTeam +
          ' ' +
          this.goal() +
          '-' +
          this.goal() +
          ' ' +
          teamArray[shiftArray[0]]
      );
      this.matchesOfWeek.push(
        teamArray[shiftArray[1]] +
          ' ' +
          this.goal() +
          '-' +
          this.goal() +
          ' ' +
          teamArray[shiftArray[2]]
      );

      let firstElement = shiftArray.shift();
      shiftArray.push(firstElement);
    }}
  }
  funcNext() {
    if (this.week >= 10) {
      return;
    }
    this.week = this.week + 2;
  }
  funcBack() {
    if (this.week <= 0) {
      return;
    }
    this.week = this.week - 2;
  }
}
