import { Component, OnInit } from '@angular/core';
import { IClientResponse } from 'src/app/core/interfaces/client/iclient-response';
import { ClientServiceService } from 'src/app/core/services/ClientService/client-service.service';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';

@Component({
  selector: 'app-passangers-list',
  templateUrl: './passangers-list.component.html',
  styleUrls: ['./passangers-list.component.css']
})
export class PassangersListComponent implements OnInit {

  filterText: string = ""
  tableData: IClientResponse[] = []
  pageIndex: number = 0
  pageSize: number = 10
  dataLength: number = 1
  isLoading: boolean = false

  constructor(private clientService: ClientServiceService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this.clientService.GetClientListPaginated({ skip: skip, take: this.pageSize, filterText: this.filterText }).subscribe((res: BaseResponseModel) => {
      this.tableData = res.data
      this.dataLength = res.count!
      this.isLoading = false
    })
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize

    this.loadData()
  }
}
