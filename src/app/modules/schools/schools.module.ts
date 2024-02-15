import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsListComponent } from './components/schools-list/schools-list.component';
import { SchoolsTableComponent } from './components/schools-table/schools-table.component';
import { SchoolAddEditComponent } from './components/school-add-edit/school-add-edit.component';
import { MapComponent } from './components/map/map.component';
import { MapSearchComponent } from './components/map-search/map-search.component';



@NgModule({
  declarations: [
    SchoolsListComponent,
    SchoolsTableComponent,
    SchoolAddEditComponent,
    MapComponent,
    MapSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SchoolsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressBarModule
  ]
})
export class SchoolsModule { }
