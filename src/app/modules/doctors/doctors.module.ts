import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';

@NgModule({
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModule
  ],
  declarations: [DoctorsListComponent, AddDoctorComponent]
})
export class DoctorsModule { }
