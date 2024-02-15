import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ILocation } from 'src/app/core/interfaces/maps/iLocation';
import { ISchool } from 'src/app/core/interfaces/schools/i-school';
import { SearchLocationsService } from 'src/app/core/services/MapsService/search-locations.service';
import { SchoolsService } from 'src/app/core/services/SchoolService/schools.service';

@Component({
  selector: 'app-school-add-edit',
  templateUrl: './school-add-edit.component.html',
  styleUrls: ['./school-add-edit.component.css']
})
export class SchoolAddEditComponent implements OnInit {

  isEdit: boolean = false
  schoolId: string = ""
  school: ISchool = {
    scolNamAr: "",
    scolNamEn: "",
    scolAdrs: "",
    scolLat: "",
    scolLng: ""
  }

  currentSchoolLocation: ILocation = {
    name: "",
    lat: 0,
    lng: 0
  }

  constructor(private schoolsService: SchoolsService, private route: ActivatedRoute, private mapService: SearchLocationsService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.schoolId = param.get("id") || ""
      this.isEdit = param.get("id") ? true : false
      if (this.isEdit) {
        this.schoolsService.GetSchoolById(this.schoolId).subscribe(res => {
          this.school = res.data
          this.currentSchoolLocation = {
            name: res.data.scolAdrs,
            lat: parseFloat(res.data.scolLat),
            lng: parseFloat(res.data.scolLng)
          }
        })
      }
    })
  }

  onSubmit() {
    if (this.isEdit) {
      this.schoolsService.EditSchool(this.school).subscribe(res => this.router.navigate(["/main/schools"]))
    }
    else {
      this.schoolsService.AddSchool(this.school).subscribe(res => this.router.navigate(["/main/schools"]))
    }
  }

  changeLocation(location: ILocation) {
    this.school.scolLat = String(location.lat)
    this.school.scolLng = String(location.lng)
    this.school.scolAdrs = location.name

    this.currentSchoolLocation = {
      name: location.name,
      lat: location.lat,
      lng: location.lng
    }
  }

}
