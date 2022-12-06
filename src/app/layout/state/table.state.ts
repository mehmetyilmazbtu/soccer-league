import { Root} from "../../models/table.model"

export interface TableState {
    tables: Root[];
}

export const initialState: TableState = {
    tables: []
    
}