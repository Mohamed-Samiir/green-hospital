import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IMessageFilterRequest } from '../../interfaces/messages/imessage-filter-request';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  getMessageListURL = environment.baseURL + 'ContactUs/get-contact-us-paginated';
  getMessageDetailsURL = environment.baseURL + 'ContactUs/get-contact-us-details/';
  constructor(private http: HttpClient, private router: Router) { }
  GetMessageList(model:IMessageFilterRequest ) {
    return this.http.post<BaseResponseModel>(this.getMessageListURL, model);

  }
  GetMessageDetails(id: string) {
    return this.http.get<BaseResponseModel>(this.getMessageDetailsURL + id);

  }
}
