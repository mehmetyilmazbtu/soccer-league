import { TableState } from "./table.state"
import { createFeatureSelector,createSelector } from "@ngrx/store"

const getTablesState = createFeatureSelector<TableState>('tables')

export const getTables = createSelector(getTablesState, (state)=>{
    return state.tables
})