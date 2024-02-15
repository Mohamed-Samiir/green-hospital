import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IDriverAddBalance } from '../../interfaces/driver/iDriver-add-balance';
import { IDriverDeductBalance } from '../../interfaces/driver/iDriver-deduct-balance';
import { IDriverFilterRequest } from '../../interfaces/driver/idriver-filter-request';
import { IdriverTripsFilterRequest } from '../../interfaces/driver/idriver-trips-filter-request';
import { IDriverTransactions } from '../../interfaces/driver/iDriver-Transactions';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class DriverServiceService {

  DriverListURL = environment.baseURL + 'Driver/driver-list-paginated';
  DriverJoinRequestListURL = environment.baseURL + 'Driver/driver-request-list-paginated';
  getJoinRequestDetailsURL = environment.baseURL + 'Driver/driver-details/';
  getDriverDetailsURL = environment.baseURL + 'Driver/driver-details/';
  AcceptJoinRequestURL = environment.baseURL + 'Driver/accept-join-request/';
  RejectJoinRequestURL = environment.baseURL + 'Driver/reject-join-request/';
  BlockDriverURL = environment.baseURL + 'Driver/block-driver/';
  UnBlockDriverURL = environment.baseURL + 'Driver/Unblock-driver/';
  DriverBalanceURL = environment.baseURL + 'Driver/get-driver-balance/'
  GetDriverTripsURL = environment.baseURL + 'Driver/driver-trips'
  DriverTransactionsURL = environment.baseURL + 'Driver/get-driver-transaction/'
  DriverDeductFromBalanceURL = environment.baseURL + 'Driver/deduct-from-driver/'
  DriverAddToBalanceURL = environment.baseURL + 'Driver/add-driver-bonus/'
  GetAllTodayTripsURL = environment.baseURL + 'DriverTrips/get-all-today-trips/';
  GetTripDetailsURL = environment.baseURL + 'DriverTrips/get-trip-details/';

  constructor(private http: HttpClient, private router: Router) { }

  GetDriverListPaginated(model: IDriverFilterRequest) {
    return this.http.post<BaseResponseModel>(this.DriverListURL, model);
  }
  GetDriverJoinRequestListPaginated(model: IDriverFilterRequest) {
    return this.http.post<BaseResponseModel>(this.DriverJoinRequestListURL, model);
  }
  GetJoinRequestDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.getJoinRequestDetailsURL + id);

  }
  GetDriverDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.getDriverDetailsURL + id);

  }
  BlockDriver(id: string) {
    return this.http.get<BaseResponseModel>(this.BlockDriverURL + id);

  }
  UnBlockDriver(id: string) {
    return this.http.get<BaseResponseModel>(this.UnBlockDriverURL + id);

  }
  RejectJoinRequest(id: string) {
    return this.http.get<BaseResponseModel>(this.RejectJoinRequestURL + id);

  }
  AcceptJoinRequest(id: string) {
    return this.http.get<BaseResponseModel>(this.AcceptJoinRequestURL + id);

  }
  GetDriverBalance(id: string) {
    return this.http.get<BaseResponseModel>(this.DriverBalanceURL + id);
  }
  GetDriverTripsListPaginated(model: IdriverTripsFilterRequest) {
    return this.http.post<BaseResponseModel>(this.GetDriverTripsURL, model);
  }

  GetDriverTransactions(model: IDriverTransactions) {
    return this.http.post<BaseResponseModel>(this.DriverTransactionsURL, model);
  }

  DeductFromDriverBalance(model: IDriverDeductBalance) {
    return this.http.post<BaseResponseModel>(this.DriverDeductFromBalanceURL, model);
  }

  AddToDriverBalance(model: IDriverAddBalance) {
    return this.http.post<BaseResponseModel>(this.DriverAddToBalanceURL, model);
  }

  GetAllTodayTrips(model: IDriverFilterRequest) {
    return this.http.post<BaseResponseModel>(this.GetAllTodayTripsURL, model);
  }

  GetTripDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.GetTripDetailsURL + id);
  }
}
