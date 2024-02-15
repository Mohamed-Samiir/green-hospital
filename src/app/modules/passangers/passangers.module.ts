import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PassangersRoutingModule } from './passangers-routing.module';
import { PassangersListComponent } from './components/passangers-list/passangers-list.component';
import { PassangersTableComponent } from './components/passangers-table/passangers-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PassangerDetailsComponent } from './components/passanger-details/passanger-details.component';
import { PassangerTripsTableComponent } from './components/passanger-trips-table/passanger-trips-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PassangersListComponent,
    PassangersTableComponent,
    PassangerDetailsComponent,
    PassangerTripsTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PassangersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressBarModule,
    SharedModule,
    MatDialogModule,
  ]
})
export class PassangersModule { }
