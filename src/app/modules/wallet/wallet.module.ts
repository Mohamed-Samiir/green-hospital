import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletBalanceComponent } from './wallet-balance/wallet-balance.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    WalletBalanceComponent,
    TransactionsTableComponent,
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule
  ]
})
export class WalletModule { }
