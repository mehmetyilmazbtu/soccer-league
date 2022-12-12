import { createReducer, on } from "@ngrx/store"
import { addTableSuccess } from "./table.actions"
import { initialState } from "./table.state"

const _tableReducer = createReducer(
    initialState,
     on(addTableSuccess,
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