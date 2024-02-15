import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';
import { DriversRequestsDetailsComponent } from './components/drivers-requests-details/drivers-requests-details.component';
import { DriversRequestsComponent } from './components/drivers-requests/drivers-requests.component';

const routes: Routes = [
  {
    path: 'requests',
    component: DriversRequestsComponent
  },
  {
    path: 'requestDetails',
    component: DriversRequestsDetailsComponent
  },
  {
    path: 'details',
    component: DriverDetailsComponent
  },
  {
    path: '',
    component: DriversListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
