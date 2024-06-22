export interface DataGridFilter {
    label: string,
    controlName: string,
    type: number,
    dataApi?: string,
    multiSelect?: boolean,
    optionValue?: string,
    optionLabel?: string,
    matchMulti?: boolean,
    matchWith?: string,
}
