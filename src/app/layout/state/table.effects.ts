import {Actions, createEffect, ofType} from '@ngrx/effects';
import { TeamsService } from 'src/app/services/teams.service';
import {Injectable} from '@angular/core';
import { catchError,map, switchMap} from 'rxjs/operators';
import { addTable, addTableError, addTableSuccess } from './table.actions';
import {of} from 'rxjs'

@Injectable()
export class TableEffects {
    addTables$ = createEffect(()=>
    this.actions$.pipe(
        ofType(addTable),
        switchMap(() => this.teamsService.getTeams().pipe(
            map(tables=> addTableSuccess(tables) ),
            catchError(()=> of(addTableError()))
        ))
    )
    )

    constructor(
        private actions$: Actions,
        private teamsService: TeamsService  
    ){}
}