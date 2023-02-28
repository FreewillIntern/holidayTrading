import { SortDescriptor } from "@progress/kendo-data-query";

interface Column {
    field?: string,
    editable?: boolean,
    title?: string,
    width?: string,
    cell?: string
};

export interface Holiday{
    mktcode:string,
    holidaydate: string,
    cantradedate: string,
    description: string,
    inEdit?: any | undefined
};

export interface StoreState {
    holidays: Holiday[],
    markets: [],
    marketCode: string,
    marketName: string,
    year: string,
};


export interface Data{
    editItem: undefined,
    sort:SortDescriptor[],
    loader: boolean,
    currentEdit: any,
    visible: boolean,
    changes: boolean,
    editID: null,
    editField: undefined,
    group: [{ field:string }],
    expandedItems: [],
    columns: Column[],
    gridData:Holiday[],
    url:string,
    loading: boolean,
}
