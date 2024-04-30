import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecializationsListComponent } from './specializations-list/specializations-list.component';
import { SpecializationsRoutingModule } from './specializations.routing';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SpecializationsRoutingModule,
    SharedModule
  ],
  declarations: [SpecializationsListComponent]
})
export class SpecializationsModule { }
