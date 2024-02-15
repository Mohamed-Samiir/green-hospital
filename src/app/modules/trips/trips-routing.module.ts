import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecursiveGroupDetailsComponent } from './components/recursive-group-details/recursive-group-details.component';
import { RecursiveTripsComponent } from './components/recursive-trips/recursive-trips.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';

const routes: Routes = [
  {
    path: "group",
    component: RecursiveGroupDetailsComponent
  },
  {
    path: "details",
    component: RequestDetailsComponent
  },
  {
    path: "",
    component: RecursiveTripsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
