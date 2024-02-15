import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { TodayTripsSummaryComponent } from './components/today-trips-summary/today-trips-summary.component';
import { TodayTripsTableComponent } from './components/today-trips-table/today-trips-table.component'
import { TodayTripsDetailsModalComponent } from './components/today-trips-details-modal/today-trips-details-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TodayTripsSummaryComponent,
    TodayTripsTableComponent,
    TodayTripsDetailsModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DashboardRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatChipsModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
