export interface AddDoctorModel {
    _id?: string,
    name: string,
    degree: string,
    specialization: string[],
    subSpecializations: string[],
    isActive: boolean
}
