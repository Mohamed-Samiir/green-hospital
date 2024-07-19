import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionsRoutingModule } from './questions-routing.module';

@NgModule({
    imports: [
        CommonModule,
        QuestionsRoutingModule,
        SharedModule
    ],
    declarations: [QuestionsListComponent, AddQuestionComponent]
})
export class QuestionsModule { }
