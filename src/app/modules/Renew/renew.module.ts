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
import { RenewComponent } from './components/renew-add-edit/renew.component';
import { RenewListComponent } from './components/renew-list/renew-list.component';
import { RenewsRoutingModule } from './renew-routing.module';




@NgModule({
  declarations: [
    RenewListComponent,
    RenewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RenewsRoutingModule,
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
export class RenewModule { }
