import { Routes, RouterModule } from '@angular/router';
import { SpecializationsListComponent } from './specializations-list/specializations-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SpecializationsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SpecializationsRoutingModule { }
