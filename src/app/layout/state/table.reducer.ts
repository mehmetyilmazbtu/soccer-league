import { createReducer, on } from "@ngrx/store"
import { addTable } from "./table.actions"
import { initialState } from "./table.state"

const _tableReducer = createReducer(
    initialState,
     on(addTable,
    (state, action)=>{
        let table = {...action.table};
        table.id = state.tables.length;
        return{
            ...state,
            tables: [...state.tables, table]
        }
    })
)

export function tableReducer(state, action){
    return _tableReducer(state,action)
}