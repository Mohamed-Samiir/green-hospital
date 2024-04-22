export interface AddDoctorModel {
    name: string,
    degree: string,
    specialization: string[],
    subSpecializations: string[],
    isActive?: boolean
}
