import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDriverResponse } from 'src/app/core/interfaces/driver/idriver-response';
import { DriverServiceService } from 'src/app/core/services/DriverService/driver-service.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']
})
export class DriversListComponent implements OnInit {

  filterText: string = ""
  tableData: IDriverResponse[] = []
  pageIndex: number = 0
  pageSize: number = 10
  dataLength: number = 1
  isLoading: boolean = false

  constructor(private driverService: DriverServiceService, private _router: Router, private userService: AuthService) { }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn())
      this._router.navigate([`/auth/login`]);
    this.loadData()
  }

  loadData() {
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this.driverService.GetDriverListPaginated({ skip: skip, take: this.pageSize, filterText: this.filterText }).subscribe(res => {
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
