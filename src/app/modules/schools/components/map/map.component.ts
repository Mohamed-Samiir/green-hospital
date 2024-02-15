import { SimpleChanges, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { ILocation } from 'src/app/core/interfaces/maps/iLocation';
import { ImapPoint } from 'src/app/core/interfaces/maps/imap-point';
import { GetCurrentLocationService } from 'src/app/core/services/ClientService/getCurrentLocation.service';
import { SearchLocationsService } from 'src/app/core/services/MapsService/search-locations.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private getCurrentLocation: GetCurrentLocationService, private locationService: SearchLocationsService) { }

  @Input() isEdit: boolean = false
  @Input() editCurrentLocation: ILocation = {
    name: "",
    lat: 0,
    lng: 0
  }
  @Output() onChangeLocation = new EventEmitter<ILocation>()

  map: L.Map | undefined;
  currentMarker: L.Layer | undefined
  currentLocation: ILocation = {
    name: "",
    lat: 0,
    lng: 0
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [this.currentLocation.lat, this.currentLocation.lng],
      zoom: 17
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    tiles.addTo(this.map);
    this.map?.addEventListener("click", e => {
      if (this.currentMarker)
        this.map?.removeLayer(this.currentMarker)
      this.locationService.getLocationName(e.latlng.lat, e.latlng.lng).subscribe(res => {
        this.currentLocation = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          name: res?.display_name
        }
        this.setCurrentMarker(e.latlng.lat, e.latlng.lng)
      })
    })
  }



  ngOnInit(): void {
    if (!this.isEdit) {
      this.getCurrentLocation.getLocation().then(res => {
        this.currentLocation = { lat: res.lat, lng: res.lng, name: "" }
        this.initMap();
      })
    }
    else {
      this.currentLocation = { ...this.editCurrentLocation }
      this.initMap()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["editCurrentLocation"].currentValue.lat !== this.currentLocation.lat || changes["editCurrentLocation"].currentValue.lng !== this.currentLocation.lng) {
      this.currentLocation = changes["editCurrentLocation"].currentValue
      this.setCurrentMarker(this.editCurrentLocation.lat, this.editCurrentLocation.lng)
      this.updateMapPoint(changes["editCurrentLocation"].currentValue.lat, changes["editCurrentLocation"].currentValue.lng)
    }
  }


  private setCurrentMarker(lat: number, lng: number) {
    const mapIcon = this.getDefaultIcon();
    let currentMarker = L.marker([lat, lng]).setIcon(mapIcon).addTo(this.map!)
    this.currentMarker = currentMarker
    this.onChangeLocation.emit({ lat: lat, lng: lng, name: this.currentLocation.name })
  }

  private getDefaultIcon() {
    return L.icon({
      iconSize: [31, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/images/marker_map_icon.png'
    });
  }

  getAddress(location: ImapPoint) {
    this.currentLocation = { lat: parseFloat(location.lat), lng: parseFloat(location.lon), name: location.display_name }
    this.updateMapPoint(parseFloat(location.lat), parseFloat(location.lon))
    this.setCurrentMarker(parseFloat(location.lat), parseFloat(location.lon))
  }

  updateMapPoint(lat: number, lng: number) {
    this.map?.setView(L.latLng(lat, lng), 18)
  }

}
