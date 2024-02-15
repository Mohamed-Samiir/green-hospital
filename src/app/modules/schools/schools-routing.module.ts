import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolAddEditComponent } from './components/school-add-edit/school-add-edit.component';
import { SchoolsListComponent } from './components/schools-list/schools-list.component';

const routes: Routes = [
  {
    path: "add-edit",
    component: SchoolAddEditComponent
  },
  {
    path: "add-edit/:id",
    component: SchoolAddEditComponent
  },
  {
    path: "",
    component: SchoolsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
