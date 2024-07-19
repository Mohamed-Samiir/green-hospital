import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { DepartmentsRoutingModule } from './departments-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DepartmentsRoutingModule,
        SharedModule
    ],
    declarations: [DepartmentsListComponent, AddDepartmentComponent]
})
export class DepartmentsModule { }
