import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { AddShortcut } from '../../interfaces/add-shortcut';

@Injectable({
  providedIn: 'root'
})
export class DataGridDdlsService {

  AddShortcutURL = environment.baseURL + "shortcuts/addShortcut"
  GetUserShortcutsURL = environment.baseURL + "shortcuts/getUserShortcuts"
  DeleteUserShortcutsURL = environment.baseURL + "shortcuts/deleteShortcut"

  constructor(private http: HttpClient) { }

  getDropdownData(url: string) {
    return this.http.get<BaseResponseModel>(`${environment.baseURL}${url}`);
  }

  saveShortcut(addShortcutModel: AddShortcut) {
    return this.http.post<BaseResponseModel>(this.AddShortcutURL, addShortcutModel)
  }

  getUserShortcuts() {
    return this.http.get<BaseResponseModel>(this.GetUserShortcutsURL);
  }

  deleteShortcut(shortcutId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteUserShortcutsURL}/${shortcutId}`);

  }
}
