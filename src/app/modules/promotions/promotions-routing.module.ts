import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionAddEditComponent } from './components/promotion-add-edit/promotion-add-edit.component';
import { PromotionsListComponent } from './components/promotions-list/promotions-list.component';

const routes: Routes = [
  {
    path: "add-edit",
    component: PromotionAddEditComponent
  },
  {
    path: "add-edit/:id",
    component: PromotionAddEditComponent
  },
  {
    path: "",
    component: PromotionsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule { }
