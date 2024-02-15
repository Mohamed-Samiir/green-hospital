import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { MessagingDetailsComponent } from './components/messaging-details/messaging-details.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MessagesListComponent,
    MessagingDetailsComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MatPaginatorModule,
    SharedModule,
    MatProgressBarModule
  ]
})
export class MessagesModule { }
