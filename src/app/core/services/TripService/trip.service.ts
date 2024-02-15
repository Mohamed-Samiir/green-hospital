import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ItripsRequestsFilterPaginatedRequest } from '../../interfaces/trips/itrips-requests-filter-paginated-request';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  getTripsRequestsURL = environment.baseURL + 'Tripta/trip-requests';
  getTripsRequestDetailsURL = environment.baseURL + 'Tripta/trip-requests-detils/';
  cancelTripRequestURL = environment.baseURL + 'Tripta/cancel-trip-request/';
  getTripsCountURL = environment.baseURL + 'DriverTrips/get-today-trips-count';
  constructor(private http: HttpClient, private router: Router) { }
  GetRequestsListPAginated(model: ItripsRequestsFilterPaginatedRequest) {
    return this.http.post<BaseResponseModel>(this.getTripsRequestsURL, model);
  }

  GetRequestDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.getTripsRequestDetailsURL + id);
  }

  CancelTripRequest(id: string) {
    return this.http.get<BaseResponseModel>(this.cancelTripRequestURL + id);
  }

  getTripsCount() {
    return this.http.get<BaseResponseModel>(this.getTripsCountURL );
  }
}
