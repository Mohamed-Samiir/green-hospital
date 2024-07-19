import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProceduresListComponent } from './procedures-list/procedures-list.component';
import { AddProcedureComponent } from './add-procedure/add-procedure.component';
import { ProceduresRoutingModule } from './procedures-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ProceduresRoutingModule,
        SharedModule
    ],
    declarations: [ProceduresListComponent, AddProcedureComponent]
})
export class ProceduresModule { }
