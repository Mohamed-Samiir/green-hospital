import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletBalanceComponent } from './wallet-balance/wallet-balance.component';

const routes: Routes = [
  {
    path: ":userType/:id",
    component: WalletBalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
