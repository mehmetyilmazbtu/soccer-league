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
  teams: any;
  constructor(
    private teamsService: TeamsService,
    private algorithmsService: AlgorithmsService
  ) {}
  ngOnInit(): void {
    this.teams$.subscribe((res) => {
      this.teams = res;
      this.matchesOfWeek = this.algorithmsService.fiksturAlgoritmasi(res);
      this.teams = this.algorithmsService.playMatches(
        this.week,
        this.teams,
        this.matchesOfWeek
      );
    });
  }
  funcNext() {
    if (this.week >= 10) {
      return;
    }
    this.week += 2;
    this.teams = this.algorithmsService.playMatches(
      this.week,
      this.teams,
      this.matchesOfWeek
    );
  }
  funcBack() {
    if (this.week <= 0) {
      return;
    }
    this.week -= 2;
  }

  editTable(evSahibi, deplasman) {
    let body = {
      id: 0,
      takim: 'Galatasaray',
      oynananMac: 0,
      beraberlik: 0,
      maglubiyet: 0,
      atilanGol: 0,
      yenilenGol: 0,
      avaraj: 0,
      puan: 0,
    };
    this.teamsService.updateData(body, 0).subscribe();
  }
}