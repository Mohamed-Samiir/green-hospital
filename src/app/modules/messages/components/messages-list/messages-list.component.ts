import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Imessage } from 'src/app/core/interfaces/messages/imessage';
import { IMessageFilterRequest } from '../../../../core/interfaces/messages/imessage-filter-request';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { MessageService } from '../../../../core/services/MessageService/message.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  dataList: Imessage[] | undefined;
  filterModel: IMessageFilterRequest = { skip: 0, take: 200 }
  pageIndex: number = 0
  pageSize: number = 3
  dataLength: number = 1
  isLoading: boolean = false

  constructor(private _messageService: MessageService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  GoToDetails(messageId: string) {
    this._router.navigate([`/main/messages/details`], {
      queryParams: {
        id: messageId,
      }
    });
  }

  loadData() {
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this._messageService.GetMessageList({ skip, take: this.pageSize }).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.dataList = res.data as Imessage[]
          this.dataLength = res.count!
        }
        else {
          console.log(res.message);
        }
        this.isLoading = false
      },

    );
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize

    this.loadData()
  }
}
