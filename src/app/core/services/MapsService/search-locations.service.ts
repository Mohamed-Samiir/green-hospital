import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImapPoint } from '../../interfaces/maps/imap-point';

@Injectable({
  providedIn: 'root'
})
export class SearchLocationsService {

  BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
  DEFAULT_VIEW_BOX: string = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';
  serchLocationsURL = `https://${this.BASE_NOMINATIM_URL}/search?format=json&q=`;
  getLocationNameRL = "https://nominatim.openstreetmap.org/reverse?";

  constructor(private http: HttpClient) { }

  getSearchList(search: string) {
    return this.http.get<ImapPoint[]>(this.serchLocationsURL + `${search}`)
  }

  getLocationName(lat: number, lng: number) {
    return this.http.get<ImapPoint>(this.getLocationNameRL + `lat=${lat}&lon=${lng}&format=json`)
  }
}
