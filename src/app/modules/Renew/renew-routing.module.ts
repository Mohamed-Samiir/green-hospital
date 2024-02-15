import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenewComponent } from './components/renew-add-edit/renew.component';
import { RenewListComponent } from './components/renew-list/renew-list.component';

const routes: Routes = [
  {
    path: "renew-trip",
    component: RenewComponent
  },
  {
    path: "",
    component: RenewListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewsRoutingModule { }
