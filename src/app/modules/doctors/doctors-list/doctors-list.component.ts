import { Component, OnInit } from '@angular/core';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { DoctorsService } from 'src/app/core/services/Doctors/doctors.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  doctorsList: any[] = []
  isShowAddDialog: boolean = false
  filteredDoctorsList: any[] = []
  filterTypes = FilterTypes
  gridColumns: DataGridColumn[] = [
    {
      header: "اسم الطبيب",
      field: "name"
    },
    {
      header: "الدرجة العلمية",
      field: "degree"
    },
    {
      header: "التخصص",
      field: "specialization"
    },
    {
      header: "التخصصات الفرعية",
      field: "subSpecializations",
    }
  ]

  gridFilters: DataGridFilter[] = [
    {
      controlName: "name",
      label: "اسم الطبيب",
      type: this.filterTypes.text
    },
    {
      controlName: "degree",
      label: "الدرجة العلمية",
      type: this.filterTypes.text
    }
  ]

  constructor(private doctorsService: DoctorsService) { }

  ngOnInit() {
    this.getDoctorsList()
  }

  getDoctorsList() {
    this.doctorsService.getDoctors().subscribe(res => {
      if (res.isSuccess) {
        this.doctorsList = res.data.map((doc: any) => {
          let modifiedDoctor = { ...doc, specialization: doc.specialization.name }
          return modifiedDoctor
        })
        this.filteredDoctorsList = this.doctorsList
      }
    })
  }

  setFilteredData(filteredData: any[]) {
    this.filteredDoctorsList = filteredData
  }

  showAddDialog() {
    this.isShowAddDialog = true
  }

  hideAddDialog() {
    this.isShowAddDialog = false
  }

}
