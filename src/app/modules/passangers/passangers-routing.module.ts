import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassangerDetailsComponent } from './components/passanger-details/passanger-details.component';
import { PassangersListComponent } from './components/passangers-list/passangers-list.component';

const routes: Routes = [
  {
    path: 'details',
    component: PassangerDetailsComponent
  },
  {
    path: '',
    component: PassangersListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassangersRoutingModule { }
