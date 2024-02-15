export interface ItripRequestResponse {
  id: string
  tripRequesterId?: string,

  triptaId?: string,

  carColor?: string,
  clientId: string,
  clientFirstName?: string,
  clientLastName?: string,
  clientPhoneNumber?: string,
  clientImageURL?: string,
  carNumber?: string
  carModel?: string
  driverLicencesUrl?: string
  driverName?: string
  driverCode?: string
  driverPhoneNumber?: string

  driverCarLicencesUrl?: string
  driverImageUrl?: string
  tripType?: string
  paymentMethod?: string
  schoolNameAr?: string
  schoolNameEn?: string
  isFullyReservied?: boolean
  isGoingAndBack?: boolean
  tripDuration?: boolean
  tripStatus?: string
  tripStartDate?: Date
  tripEndDate?: Date
  creationTime?: Date

  tripPassengerNo?: number

  tripNotes?: string

  tripStartTime?: Date

  tripEndTime?: Date

  latitude?: number

  longitude?: number
  tripFromAdress?: string

  toLatitude?: number

  toLongitude?: number

  tripToAdress?: string
  passengers?: ITripPassengers[]
}

export interface ITripPassengers {
  passNm: string;
  passGrd: string;
}
