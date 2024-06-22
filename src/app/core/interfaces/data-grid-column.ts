import { GridColumnTypes } from "../enums/grid-column-types.enum";

export interface DataGridColumn {
    field: string;
    header: string;
    type: GridColumnTypes;
    unitField?: string;
}
