import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DriversRoutingModule } from './drivers-routing.module';
import { DriversComponent } from './drivers.component';
import { DriversTableComponent } from './components/drivers-table/drivers-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DriverTripsTableComponent } from './components/driver-trips-table/driver-trips-table.component';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { DriversRequestsComponent } from './components/drivers-requests/drivers-requests.component';
import { DriversRequestsDetailsComponent } from './components/drivers-requests-details/drivers-requests-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DriversComponent,
    DriversTableComponent,
    DriverTripsTableComponent,
    DriversListComponent,
    DriverDetailsComponent,
    DriversRequestsComponent,
    DriversRequestsDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DriversRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
})
export class DriversModule { }
