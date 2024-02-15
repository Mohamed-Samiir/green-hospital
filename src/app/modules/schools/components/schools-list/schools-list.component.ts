import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ISchoolResponse } from 'src/app/core/interfaces/schools/ischool-response';
import { SchoolsService } from 'src/app/core/services/SchoolService/schools.service';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { AlertifyService } from '../../../../core/services/alertify-services/alertify.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-schools-list',
  templateUrl: './schools-list.component.html',
  styleUrls: ['./schools-list.component.css']
})
export class SchoolsListComponent implements OnInit {

  tableData: ISchoolResponse[] = []
  pageIndex: number = 0
  pageSize: number = 10
  dataLength: number = 1
  isLoading: boolean = false



  constructor(private schoolsService: SchoolsService, public dialog: MatDialog, private _activatedRoute: ActivatedRoute,
    private _alertify: AlertifyService, private _router: Router) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.isLoading = true
    let skip = this.pageIndex * this.pageSize
    this.schoolsService.GetSchoolsListPaginated({ skip: skip, take: this.pageSize }).subscribe((res: BaseResponseModel) => {
      this.tableData = res.data
      this.dataLength = res.count!
      this.isLoading = false
    })
  }

  DeleteSchool(id: string) {
    this.schoolsService.DeleteSchool(id).subscribe((res: BaseResponseModel) => {
      this.tableData = this.tableData.filter(school => school.id !== id)
    })
  }

  onPageChange(e: any){
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize

    this.loadData()
  }
  openDeleteModal(id: string) {
    const message = "Are you sure you want to delete this school?"
    const dialogData = new ConfirmDialogModel(" Delete school", message);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "40%",
      height: "auto",
      data: dialogData,
      panelClass: "custom-dialog-container"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.DeleteSchool(id);
      }
    })
  }

}
