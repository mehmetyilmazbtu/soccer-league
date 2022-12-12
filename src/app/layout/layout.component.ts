import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Root } from '../models/table.model';
import { AlgorithmsService } from '../services/algorithms.service';
import { TeamsService } from '../services/teams.service';
import { AppState } from '../store/app.state';
import { addTableSuccess } from './state/table.actions';
import { getTables } from './state/table.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
],
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
    // console.log(this.week)
  }
  funcNext() {
    if (this.week >= 5) {
      return;
    }
    this.week++;
    //if in state
    if (this.tablesLength>=(this.week+1)) {
      this.tables$.subscribe((res) => {
        for (let i = 0; i < this.teams.length; i++) {
          let arr = res[this.week][i];
          this.teamsService.updateData(arr, i).subscribe();
        }
      });
      this.teams$.subscribe((res) => (this.teams = res));
      this.backCounter--;
      return;
    } else {
      this.teams = this.algorithmsService.playMatches(
        this.week,
        this.teams,
        this.matchesOfWeek
      );
      for (let i = 0; i < this.teams.length; i++) {
        let data = this.teams.find((x) => x.id === i);
        this.teamsService.updateData(data, i).subscribe();
      }
      this.teams$.subscribe((res) => {
        this.teams = res;
        this.onAddTable();
      });
    }
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
        }
        this.teams$.subscribe((res) => (this.teams = res));
      }

      this.week --;
      this.backCounter++;
    });
  }

  funcReset() {
    for (let i = 0; i < this.teams.length; i++) {
      var data = this.teams.find((x) => x.id === i);
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
    this.store.dispatch(addTableSuccess({ table: this.teams }));
  }
}
