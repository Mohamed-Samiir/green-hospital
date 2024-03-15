import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyPlaceholderComponent } from './components/empty-placeholder/empty-placeholder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MinValueValidatorDirective } from './directives/min-value-validator.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { DataTableFilterComponent } from './components/data-table-filter/data-table-filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    FontAwesomeModule
  ],
  declarations: [
    EmptyPlaceholderComponent,
    MinValueValidatorDirective,
    DataGridComponent,
    DataTableFilterComponent
  ],
  exports: [
    EmptyPlaceholderComponent,
    TranslateModule,
    DataGridComponent,
    DataTableFilterComponent,
    FontAwesomeModule
  ],
  providers: [TranslateService]
})
export class SharedModule { }
