export interface Procedure {
    _id?: string,
    name: string,
    doctors: string[],
    price: number,
    acceptInsurance?: boolean,
    ageFrom: number,
    ageFromUnit: number,
    ageTo: number,
    ageToUnit: number,
    notes?: string,
    branchId?: string,
    branchName?: string
}
