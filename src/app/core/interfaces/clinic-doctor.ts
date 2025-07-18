export interface ClinicDoctor {
    doctorId?: string,
    _id?: string,
    clinic: string,
    doctor: string,
    branches?: string[],
    price: number,
    acceptInsurance?: boolean,
    freeVisitFollowup?: boolean,
    freeOperationFollowup?: boolean,
    ageFrom: number,
    ageFromUnit: number,
    ageTo: number,
    ageToUnit: number,
    notes?: string
}
