import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IClientTripsFilter } from '../../interfaces/client/i-client-trips-filter';
import { IClientAddDeductBalance } from '../../interfaces/client/iClient-add-deduct-balance';
import { IClientFilterRequest } from '../../interfaces/client/iclient-filter-request';
import { IClientTransaction } from '../../interfaces/client/iClient-transaction';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  ClientListURL = environment.baseURL + 'Client/client-list-paginated';
  ClientDetailsURL = environment.baseURL + 'Client/client-details/';
  ClientTripsURL = environment.baseURL + 'Client/client-trips';
  BlockClientURL = environment.baseURL + 'Client/block-client/';
  UnBlockClientURL = environment.baseURL + 'Client/unblock-client/';
  ClientBalanceURL = environment.baseURL + 'Client/get-client-balance/'
  ClientTransactionsURL = environment.baseURL + 'Client/get-client-transaction/'
  ClientDeductFromBalanceURL = environment.baseURL + 'Client/deduct-client-credit/'
  ClientAddToBalanceURL = environment.baseURL + 'Client/add-client-credit/'
  constructor(private http: HttpClient, private router: Router) { }

  GetClientListPaginated(model: IClientFilterRequest) {
    return this.http.post<BaseResponseModel>(this.ClientListURL, model);
  }
  GetClientDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.ClientDetailsURL + id);

  }
  GetClientTripsListPaginated(model: IClientTripsFilter) {
    return this.http.post<BaseResponseModel>(this.ClientTripsURL, model);
  }
  BlockClient(id: string) {
    return this.http.get<BaseResponseModel>(this.BlockClientURL + id);
  }
  GetClientBalance(id: string){
    return this.http.get<BaseResponseModel>(this.ClientBalanceURL + id);
  }

  GetClientTransactions(model: IClientTransaction){
    return this.http.post<BaseResponseModel>(this.ClientTransactionsURL, model);
  }

  DeductFromClientBalance(model: IClientAddDeductBalance){
    return this.http.post<BaseResponseModel>(this.ClientDeductFromBalanceURL, model);
  }

  AddToClientBalance(model: IClientAddDeductBalance){
    return this.http.post<BaseResponseModel>(this.ClientAddToBalanceURL , model);
  }
  UNBlockClient(id: string) {
    return this.http.get<BaseResponseModel>(this.UnBlockClientURL + id);
  }
}
