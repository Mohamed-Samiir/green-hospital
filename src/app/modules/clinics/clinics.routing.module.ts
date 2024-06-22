import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClinicsListComponent } from './clinics-list/clinics-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClinicsRoutingModule { }
