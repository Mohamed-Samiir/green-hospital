import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  isExpanded: boolean = true
  constructor() { }

  getIsExpanded() {
    return this.isExpanded
  }

  toggleSideNav() {
    this.isExpanded = !this.isExpanded
    return this.isExpanded
  }

}
