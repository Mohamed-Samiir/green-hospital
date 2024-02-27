import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { EmptyPlaceholderComponent } from './components/empty-placeholder/empty-placeholder.component';
import { FormsModule } from '@angular/forms';
import { MinValueValidatorDirective } from './directives/min-value-validator.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    TranslateModule
  ],
  declarations: [SharedComponent, EmptyPlaceholderComponent, MinValueValidatorDirective],
  exports: [EmptyPlaceholderComponent, TranslateModule],
  providers: [TranslateService]
})
export class SharedModule { }
