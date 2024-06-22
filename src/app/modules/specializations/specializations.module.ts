import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecializationsListComponent } from './specializations-list/specializations-list.component';
import { SpecializationsRoutingModule } from './specializations.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSpecializationComponent } from './add-specialization/add-specialization.component';

@NgModule({
  imports: [
    CommonModule,
    SpecializationsRoutingModule,
    SharedModule
  ],
  declarations: [SpecializationsListComponent, AddSpecializationComponent]
})
export class SpecializationsModule { }
