import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';


import { TripsRoutingModule } from './trips-routing.module';
import { ManageRecursiveGroupsComponent } from './components/manage-recursive-groups/manage-recursive-groups.component';
import { RecursiveTripsComponent } from './components/recursive-trips/recursive-trips.component';
import { RecursiveRequestsComponent } from './components/recursive-requests/recursive-requests.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { RecursiveGroupDetailsComponent } from './components/recursive-group-details/recursive-group-details.component';
import { Time12FormatPipe } from 'src/app/core/pipes/Time12Format.pipe';


@NgModule({
  declarations: [
    ManageRecursiveGroupsComponent,
    RecursiveTripsComponent,
    RecursiveRequestsComponent,
    RequestDetailsComponent,
    RecursiveGroupDetailsComponent,
    Time12FormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TripsRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule
  ]
})
export class TripsModule { }
