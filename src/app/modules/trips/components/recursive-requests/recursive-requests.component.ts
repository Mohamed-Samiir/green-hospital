import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItripRequestResponse } from '../../../../core/interfaces/trips/itrip-request-response';
import { ItripsRequestsFilterPaginatedRequest } from '../../../../core/interfaces/trips/itrips-requests-filter-paginated-request';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { TripService } from '../../../../core/services/TripService/trip.service';

@Component({
  selector: 'app-recursive-requests',
  templateUrl: './recursive-requests.component.html',
  styleUrls: ['./recursive-requests.component.css']
})
export class RecursiveRequestsComponent implements OnInit {
  dataList: ItripRequestResponse[] | undefined;
  filterModel: ItripsRequestsFilterPaginatedRequest = { skip: 0, take: 200 }
  pageIndex: number = 0
  pageSize: number = 3
  dataLength: number = 1
  isLoading: boolean = false

  constructor(private _triptaService: TripService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }
  GoToDetails(id: string) {
    const url = this._router.serializeUrl(
      this._router.createUrlTree([`//main/trips/recursive/details/`], {

        queryParams: {
          id: id,
        }
      })
    );

    window.open(url, '_blank');
  }
   
  loadData() {
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this._triptaService.GetRequestsListPAginated({ skip, take: this.pageSize }).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.dataList = res.data as ItripRequestResponse[]
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
