import {createAction,props} from '@ngrx/store'
import { Root, Teams } from 'src/app/models/table.model';

export const addTable = createAction('[tables page] add table')
export const addTableSuccess = createAction('[tables page] add table success', props<{table: Root}>())
export const addTableError = createAction('[tables page] add table error')

