export interface Department {
    _id?: string,
    name: string,
    phoneNumbers: string[],
    allowContact?: boolean,
    contactPeriods?: string
}
