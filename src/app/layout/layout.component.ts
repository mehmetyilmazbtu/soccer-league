import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Root } from '../models/table.model';
import { AlgorithmsService } from '../services/algorithms.service';
import { TeamsService } from '../services/teams.service';
import { AppState } from '../store/app.state';
import { addTable } from './state/table.actions';
import { getTables } from './state/table.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  teams$: any = this.teamsService.getTeams();
  tables$: Observable<Root[]> = this.store.select(getTables);
  tablesLength: number;
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
  backCounter: number = 0;

  constructor(
    private teamsService: TeamsService,
    private algorithmsService: AlgorithmsService,
    private store: Store<AppState>
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
      for (let i = 0; i < this.teams.length; i++) {
        let data = this.teams.find((x) => x.id === i);
        this.teamsService.updateData(data, i).subscribe();
      }
      this.onAddTable();
    });
    this.tables$.subscribe((res) => (this.tablesLength = res.length));
  }
  funcNext() {
    if (this.week >= 10) {
      return;
    }
    this.week += 2;
    if (this.tablesLength > this.week / 2) {
      this.tables$.subscribe((res) => {
        for (let i = 0; i < this.teams.length; i++) {
          let arr = res[this.week / 2][i];
          this.teamsService.updateData(arr, i).subscribe();
          console.table(arr);
        }
      });
      
      return this.teams$.subscribe((res) => {
        this.teams = res;
        console.log(res);
      });
    }
    console.log('geçiş');

    this.teams = this.algorithmsService.playMatches(
      this.week,
      this.teams,
      this.matchesOfWeek
    );
    for (let i = 0; i < this.teams.length; i++) {
      let data = this.teams.find((x) => x.id === i);
      this.teamsService.updateData(data, i).subscribe();
    }
    this.onAddTable();
    console.table(this.teams);
  }
  funcBack() {
    if (this.week <= 0) {
      return;
    }
    this.tables$.subscribe((res) => {
      let arrLength = res.length;
      if (res[arrLength - 2 - this.backCounter]) {
        for (let i = 0; i < this.teams.length; i++) {
          let arr = res[arrLength - 2 - this.backCounter][i];
          this.teamsService.updateData(arr, i).subscribe();
          console.table(arr);
        }
        this.teams$.subscribe((res) => (this.teams = res));
      }

      this.week -= 2;
      this.backCounter++;
    });
  }

  funcReset() {
    for (let i = 0; i < this.teams.length; i++) {
      let data = this.teams.find((x) => x.id === i);
      data.atilanGol = 0;
      data.avaraj = 0;
      data.beraberlik = 0;
      data.maglubiyet = 0;
      data.oynananMac = 0;
      data.puan = 0;
      data.yenilenGol = 0;
      this.teamsService.updateData(data, i).subscribe();
    }
    window.location.reload();
  }
  onAddTable() {
    let table: Root;
    this.teams$.subscribe((res) => {
      table = res;
      this.store.dispatch(addTable({ table }));
    });
  }
}
