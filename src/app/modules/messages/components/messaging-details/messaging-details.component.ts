import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Imessage } from '../../../../core/interfaces/messages/imessage';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { MessageService } from '../../../../core/services/MessageService/message.service';

@Component({
  selector: 'app-messaging-details',
  templateUrl: './messaging-details.component.html',
  styleUrls: ['./messaging-details.component.css']
})
export class MessagingDetailsComponent implements OnInit {
  message: Imessage = { id: "" };
  id: string="";
  constructor(private _messageService: MessageService,
    private _activatedRoute: ActivatedRoute,) { }


  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.queryParams['id'];
    this.getMessagesDetails();
  }
  getMessagesDetails() {
    this._messageService.GetMessageDetails(this.id).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.message = res.data as Imessage
        }
        else {
          console.log(res.message);
          //this.resMessage = {
          //  message: res.message,
          //  type: BaseConstantModel.DANGER_TYPE
          //}
        }
      },

    );

  }
}
