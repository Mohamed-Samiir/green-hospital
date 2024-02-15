import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDriverFilterRequest } from '../../../../core/interfaces/driver/idriver-filter-request';
import { IDriverResponse } from '../../../../core/interfaces/driver/idriver-response';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { AuthService } from '../../../../core/services/auth.service';
import { DriverServiceService } from '../../../../core/services/DriverService/driver-service.service';

@Component({
  selector: 'app-drivers-requests',
  templateUrl: './drivers-requests.component.html',
  styleUrls: ['./drivers-requests.component.css']
})
export class DriversRequestsComponent implements OnInit {
  dataList: IDriverResponse[] | undefined;
  filterModel: IDriverFilterRequest = { skip: 0, take: 200 }
  pageIndex: number = 0
  pageSize: number = 3
  dataLength: number = 1
  isLoading: boolean = false

  constructor(private _driverService: DriverServiceService,
    private _router: Router, private userService: AuthService) { }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn())
      this._router.navigate([`/auth/login`]);
    this.loadData();
  }

  GoToDetails(id: string) {
    this._router.navigate([`/main/drivers/requestDetails`], {
      queryParams: {
        id: id,
      }
    });
  }

  loadData(){
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this._driverService.GetDriverJoinRequestListPaginated({skip, take: this.pageSize}).subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.dataList = res.data as IDriverResponse[]
        }
        else {
          console.log(res.message);
        }
        this.isLoading = false
      },

    );
  }

  onPageChange(e: any){
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize

    this.loadData()
  }
}
