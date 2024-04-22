import { Specialization } from "../specialization";
import { SubSpecialization } from "../sub-specialization";

export interface DoctorModel {
    _id: string,
    name: string,
    degree: string,
    specialization: Specialization,
    subSpecializations: SubSpecialization[]
}
