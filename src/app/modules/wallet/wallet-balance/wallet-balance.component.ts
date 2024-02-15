import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IClientResponse } from 'src/app/core/interfaces/client/iclient-response';
import { IDriverResponse } from 'src/app/core/interfaces/driver/idriver-response';
import { IClientTransaction } from 'src/app/core/interfaces/wallet/iClientTransaction';
import { ClientServiceService } from 'src/app/core/services/ClientService/client-service.service';
import { DriverServiceService } from 'src/app/core/services/DriverService/driver-service.service';
import { UpdateBalanceDialogModel, UpdateBalanceModalComponent } from 'src/app/shared/components/update-balance-modal/update-balance-modal.component';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { FilesServiceService } from 'src/app/core/services/FilesService/files-service.service';

@Component({
  selector: 'app-wallet-balance',
  templateUrl: './wallet-balance.component.html',
  styleUrls: ['./wallet-balance.component.css']
})
export class WalletBalanceComponent implements OnInit {

  tableData: IClientTransaction[] = []
  pageIndex: number = 0
  pageSize: number = 10
  dataLength: number = 1
  isLoading: boolean = false

  userType: string = ""
  userBalance: number = 5000
  totalDriverIncome: number = 0
  totalCompanyIncome: number = 0

  client: IClientResponse = {
    id: "",
    frstNm: "",
    lstNm: "",
    clntMl: "",
    clntPhnNum: "",
    prflImg: "",
  }

  driver: IDriverResponse = {
    id: "",
    frstNm: "",
    lstNm: "",
    drntMl: "",
    PhnNum: "",
    prflImg: "",
  }
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private clientService: ClientServiceService, private driverService: DriverServiceService, public alertService: AlertifyService, private fileService: FilesServiceService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(pram => {
      this.userType = pram.get("userType") || ""
      let userId = pram.get("id") || ""
      if (this.userType && this.userType == "c") {
        this.clientService.GetClientBalance(userId).subscribe(res => {
          this.userBalance = res.data
          this.clientService.GetClientDetails(userId).subscribe(response => {
            this.client = {
              id: response.data.id,
              frstNm: response.data.frstNm,
              lstNm: response.data.lstNm,
              clntMl: response.data.clntMl,
              clntPhnNum: response.data.clntPhnNum,
              prflImg: response.data.prflImg,
            }
            this.loadTransactions()
          })
        })
      }

      else if (this.userType && this.userType == "d") {
        this.driverService.GetDriverBalance(userId).subscribe(res => {
          this.userBalance = res.data
          this.driverService.GetDriverDetails(userId).subscribe(response => {
            this.driver = {
              id: response.data.id,
              frstNm: response.data.frstNm,
              lstNm: response.data.lstNm,
              drntMl: response.data.drntMl,
              PhnNum: response.data.PhnNum,
              prflImg: response.data.prflImg,
            }
            this.loadTransactions()
          })
        })
      }

    })
  }

  loadTransactions() {
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    if (this.userType && this.userType === "c") {
      this.clientService.GetClientTransactions({ clientId: this.client.id, skip: skip, take: this.pageSize }).subscribe(res => {
        this.tableData = res.data
        this.dataLength = res.count!
        this.isLoading = false
      })
    }
    else if (this.userType && this.userType === "d") {
      this.driverService.GetDriverTransactions({ driverId: this.driver.id, skip: skip, take: this.pageSize }).subscribe(res => {
        this.totalCompanyIncome = res.data.totalCompanyIncome
        this.totalDriverIncome = res.data.totalDriverIncome
        this.tableData = res.data.transactionHistory
        this.dataLength = res.count!
        this.isLoading = false
      })
    }
  }

  onPageChange(e: any) {
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize
    this.loadTransactions()
  }

  openUpdateBalanceModal(isDeduction: boolean) {
    const title = isDeduction ? "Deduct from user balance" : "Add to user balance"
    const dialogData = new UpdateBalanceDialogModel(title, this.userType === "d", isDeduction);
    const dialogRef = this.dialog.open(UpdateBalanceModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (!value) return
      if (this.userType && this.userType === "c") {
        if (isDeduction) {
          this.clientService.DeductFromClientBalance({ transactionAmount: value.value, clientId: this.client.id }).subscribe(res => {
            this.userBalance = this.userBalance - parseFloat(value.value)
            this.loadTransactions()
            this.alertService.success(`You have successfully deducted ${value.value} EGP from client balance`)
          })
        }
        else {
          this.clientService.AddToClientBalance({ transactionAmount: value.value, clientId: this.client.id }).subscribe(res => {
            this.userBalance = parseFloat(value.value) + this.userBalance
            this.loadTransactions()
            this.alertService.success(`You have successfully added ${value.value} EGP to client balance`)
          })
        }
      }
      else if (this.userType && this.userType === "d") {
        if (isDeduction) {
          if (value.isSalary) {
            this.fileService.UploadFile(value.file).subscribe(res => {
              // let fileUrl = res.data.url
              this.driverService.DeductFromDriverBalance({ transactionAmount: value.value, driverId: this.driver.id, isSalary: value.isSalary, transactionAttachmentUrl: res.data.url ? res.data.url : "" }).subscribe(res2 => {
                this.userBalance = this.userBalance - parseFloat(value.value)
                this.loadTransactions()
                this.alertService.success(`You have successfully deducted ${value.value} EGP from client balance`)
              })
            })
          }
          else {
            this.driverService.DeductFromDriverBalance({ transactionAmount: value.value, driverId: this.driver.id, isSalary: value.isSalary, transactionAttachmentUrl: "" }).subscribe(res2 => {
              this.userBalance = this.userBalance - parseFloat(value.value)
              this.loadTransactions()
              this.alertService.success(`You have successfully deducted ${value.value} EGP from client balance`)
            })
          }
        }
        else {
          this.driverService.AddToDriverBalance({ transactionAmount: value.value, driverId: this.driver.id }).subscribe(res => {
            this.userBalance = parseFloat(value.value) + this.userBalance
            this.loadTransactions()
            this.alertService.success(`You have successfully added ${value.value} EGP to driver balance`)
          })
        }
      }
    })
  }

}
