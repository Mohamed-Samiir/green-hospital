import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCurrentLocationService {

  constructor() { }

  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(res => {
        resolve({ lat: res.coords.latitude, lng: res.coords.longitude })
        reject(() => console.log("wrong"));
      })
    })
  }

}
