import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ImapPoint } from 'src/app/core/interfaces/maps/imap-point';
import { SearchLocationsService } from 'src/app/core/services/MapsService/search-locations.service';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css'],
})
export class MapSearchComponent implements OnInit {

  searchList: ImapPoint[] = []
  selectedLocation: ImapPoint = {
    boundingbox: [],
    class: "",
    display_name: "",
    icon: "",
    importance: 0,
    lat: "",
    licence: "",
    lon: "",
    osm_id: 0,
    osm_type: "",
    place_id: 0,
    type: ""
  }

  isResultMenuOpen: boolean = false
  @Output() onSelectLocation = new EventEmitter()
  @Input() address: string = ""

  constructor(private searchLocationsService: SearchLocationsService) { }

  ngOnInit(): void {
  }

  loadLocations() {
    this.searchLocationsService.getSearchList(this.address)
      .subscribe(res => {
        this.searchList = res
        this.isResultMenuOpen = true
      })
  }

  setSelectedLocation(location: ImapPoint) {
    this.isResultMenuOpen = false
    this.address = location.display_name
    this.onSelectLocation.emit(location)
  }

}
