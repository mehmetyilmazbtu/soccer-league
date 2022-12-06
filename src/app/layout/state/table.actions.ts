import {createAction,props} from '@ngrx/store'
import { Root, Teams } from 'src/app/models/table.model';

export const ADD_TABLE_ACTION = '[tables page] add table';

export const addTable = createAction(ADD_TABLE_ACTION, props<{table: Root}>())