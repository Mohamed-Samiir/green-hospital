import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ViewDoctorDetailsComponent } from './view-doctor-details/view-doctor-details.component';

@NgModule({
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModule
  ],
  declarations: [DoctorsListComponent, AddDoctorComponent, ViewDoctorDetailsComponent]
})
export class DoctorsModule { }
