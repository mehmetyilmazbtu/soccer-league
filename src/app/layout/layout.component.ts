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
  team: Teams;
  cols: any;
  matchesOfWeek = [];
  week: number = -2;

  constructor(private teamsService: TeamsService) {}
  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.teamsService.getTeams().then((data) => {
      this.teams = data;
      this.fiksturAlgoritmasi(this.teams);
      this.funcNext();
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

    for (let i = 0; i < 2; i++) {
      for (let i = 0; i < teamArray.length; i++) {
        this.matchesOfWeek.push(constTeam + ' - ' + teamArray[shiftArray[0]]);
        this.matchesOfWeek.push(
          teamArray[shiftArray[1]] + ' - ' + teamArray[shiftArray[2]]
        );

        let firstElement = shiftArray.shift();
        shiftArray.push(firstElement);
      }
    }
  }
  funcNext() {
    //need state management
    if (this.week >= 10) {
      return;
    }
    this.week = this.week + 2;
    console.log(this.week);
    let firstMatch = this.matchesOfWeek[this.week + 0].split(' - ');
    let secMatch = this.matchesOfWeek[this.week + 1].split(' - ');
    this.editTable(
      this.teams.findIndex((arr) => arr.takim === firstMatch[0]),
      this.teams.findIndex((arr) => arr.takim === firstMatch[1])
    );
    this.editTable(
      this.teams.findIndex((arr) => arr.takim === secMatch[0]),
      this.teams.findIndex((arr) => arr.takim === secMatch[1])
    );
    this.teams=[...this.teams]
    console.table(this.teams)
  }
  funcBack() {
    if (this.week <= 0) {
      return;
    }
    //need state management code
    this.week = this.week - 2;
  }

  editTable(evSahibi, deplasman) {
    let goals = Math.floor(Math.random() * (4 - 0 + 1) + 0);
    this.teams[evSahibi].atilanGol += goals;
    this.teams[evSahibi].oynananMac++;
    this.teams[deplasman].yenilenGol += goals;

    let goals2 = Math.floor(Math.random() * (4 - 0 + 1) + 0);
    this.teams[deplasman].atilanGol += goals2;
    this.teams[deplasman].oynananMac++;
    this.teams[evSahibi].yenilenGol += goals2;

    if (goals > goals2) {
      this.teams[evSahibi].puan += 3;
      this.teams[deplasman].maglubiyet += 1;
    } else if (goals2 > goals) {
      this.teams[deplasman].puan += 3;
      this.teams[evSahibi].maglubiyet += 1;
    } else {
      this.teams[evSahibi].puan += 1;
      this.teams[deplasman].puan += 1;
      this.teams[evSahibi].beraberlik += 1;
      this.teams[deplasman].beraberlik += 1;
    }
    this.teams[evSahibi].avaraj =
      this.teams[evSahibi].atilanGol - this.teams[evSahibi].yenilenGol;
    return 
      this.teams[evSahibi].takim +
        ' ' +
        goals +
        '-' +
        goals2 +
        ' ' +
        this.teams[deplasman].takim
    ;
  }
}
