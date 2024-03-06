import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyPlaceholderComponent } from './components/empty-placeholder/empty-placeholder.component';
import { FormsModule } from '@angular/forms';
import { MinValueValidatorDirective } from './directives/min-value-validator.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { DataTableFilterComponent } from './components/data-table-filter/data-table-filter.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    TranslateModule,
    TableModule,
    ButtonModule
  ],
  declarations: [
    EmptyPlaceholderComponent,
    MinValueValidatorDirective,
    DataGridComponent,
    DataTableFilterComponent
  ],
  exports: [EmptyPlaceholderComponent, TranslateModule, DataGridComponent, DataTableFilterComponent],
  providers: [TranslateService]
})
export class SharedModule { }
