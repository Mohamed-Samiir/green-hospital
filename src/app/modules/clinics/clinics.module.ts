import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicsListComponent } from './clinics-list/clinics-list.component';
import { ClinicsRoutingModule } from './clinics.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { ViewClinicDetailsComponent } from './view-clinic-details/view-clinic-details.component';
import { AddClinicDoctorComponent } from './add-clinic-doctor/add-clinic-doctor.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClinicsRoutingModule
  ],
  declarations: [ClinicsListComponent, AddClinicComponent, ViewClinicDetailsComponent, AddClinicDoctorComponent]
})
export class ClinicsModule { }
