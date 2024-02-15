import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { MessagingDetailsComponent } from './components/messaging-details/messaging-details.component';

const routes: Routes = [
  {
    path: "",
    component: MessagesListComponent
  },
  {
    path: "details",
    component: MessagingDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
