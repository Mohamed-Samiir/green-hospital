import { SubSpecialization } from "./sub-specialization";

export interface Specialization {
    _id?: string,
    name: string,
    subSpecializations: SubSpecialization[]
}
