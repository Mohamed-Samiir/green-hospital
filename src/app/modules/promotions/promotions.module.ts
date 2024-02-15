import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionsListComponent } from './components/promotions-list/promotions-list.component';
import { PromotionAddEditComponent } from './components/promotion-add-edit/promotion-add-edit.component';
import { PromotionsTableComponent } from './components/promotions-table/promotions-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PromotionsListComponent,
    PromotionAddEditComponent,
    PromotionsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PromotionsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PromotionsModule { }
