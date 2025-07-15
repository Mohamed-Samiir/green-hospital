import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesListComponent } from './branches-list/branches-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ViewBranchDetailsComponent } from './view-branch-details/view-branch-details.component';

@NgModule({
  imports: [
    CommonModule,
    BranchesRoutingModule,
    SharedModule
  ],
  declarations: [BranchesListComponent, AddBranchComponent, ViewBranchDetailsComponent]
})
export class BranchesModule { }
