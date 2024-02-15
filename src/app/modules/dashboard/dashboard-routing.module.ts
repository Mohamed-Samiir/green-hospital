import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayTripsSummaryComponent } from './components/today-trips-summary/today-trips-summary.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'today-trips',
    component: TodayTripsSummaryComponent
  },
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
