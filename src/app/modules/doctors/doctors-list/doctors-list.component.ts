import { Component, OnInit } from '@angular/core';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DoctorsService } from 'src/app/core/services/Doctors/doctors.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  doctorsList: any[] = []
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
      header: "الدرجة العلمية",
      field: "degree"
    },
    {
      header: "التخصص",
      field: "specialization"
    },
    {
      header: "التخصصات الفرعية",
      field: "subSpecializations"
    }
  ]

  constructor(private doctorsService: DoctorsService) { }

  ngOnInit() {
    this.getDoctorsList()
  }

  getDoctorsList() {
    this.doctorsService.getDoctors().subscribe(res => {
      if (res.isSuccess) {
        console.log(res);
        this.doctorsList = res.data
      }
    })
  }

}
