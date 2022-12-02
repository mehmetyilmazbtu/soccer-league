import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from '../services/algorithms.service';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  teams$: any = this.teamsService.getTeams();
  cols: any = [
    { field: 'takim', header: 'Takım' },
    { field: 'oynananMac', header: 'OM' },
    { field: 'beraberlik', header: 'B' },
    { field: 'maglubiyet', header: 'M' },
    { field: 'atilanGol', header: 'AG' },
    { field: 'yenilenGol', header: 'YG' },
    { field: 'avaraj', header: 'A' },
    { field: 'puan', header: 'P' },
  ];
  matchesOfWeek = [];
  week: number = 0;

  constructor(
    private teamsService: TeamsService,
    private algorithmsService: AlgorithmsService
  ) {}
  ngOnInit(): void {
    this.teams$.subscribe((res) => {
      this.matchesOfWeek = this.algorithmsService.fiksturAlgoritmasi(res);
    });
  }
  funcNext() {
    if (this.week >= 10) {
      return;
    }
    this.editTable(0, 2);
    this.week += 2;
  }
  funcBack() {
    if (this.week <= 0) {
      return;
    }
    this.week -= 2;
  }

  // funcNext() {
  //   //need state management
  //   if (this.week >= 10) {
  //     return;
  //   }
  //   this.week = this.week + 2;
  //   console.log(this.week);
  //   let firstMatch = this.matchesOfWeek[this.week + 0].split(' - ');
  //   let secMatch = this.matchesOfWeek[this.week + 1].split(' - ');
  //   this.editTable(
  //     this.teams.findIndex((arr) => arr.takim === firstMatch[0]),
  //     this.teams.findIndex((arr) => arr.takim === firstMatch[1])
  //   );
  //   this.editTable(
  //     this.teams.findIndex((arr) => arr.takim === secMatch[0]),
  //     this.teams.findIndex((arr) => arr.takim === secMatch[1])
  //   );
  //   this.teams = [...this.teams];
  //   console.table(this.teams);
  // }
  editTable(evSahibi, deplasman) {
    let body={
      id: 0,
      takim: "Galatasaray",
      oynananMac: 3,
      beraberlik: 2,
      maglubiyet: 1,
      atilanGol: 11,
      yenilenGol: 4,
      avaraj: 5,
      puan: 21
    }
    this.teamsService.updateData(body,0).subscribe()
    
  }
}
