import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { BranchModel } from 'src/app/core/interfaces/branch/branch-model';
import { BranchesService } from 'src/app/core/services/branches/branches.service';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-branches-list',
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.css']
})
export class BranchesListComponent implements OnInit {

  branchesList: BranchModel[] = []
  gridData: any[] = []
  filterData: any[] = []
  isShowAddDialog: boolean = false
  isShowDetailsDialog: boolean = false
  filterTypes = FilterTypes
  selectedBranchForEdit: BranchModel | undefined
  selectedBranchForDetails: BranchModel | undefined
  isEdit: boolean = false
  @ViewChild(AddBranchComponent) addBranchComponent!: AddBranchComponent

  faEye = faEye
  faPenToSquare = faPenToSquare
  faTrashCan = faTrashCan

  gridColumns: DataGridColumn[] = [
    {
      header: "اسم الفرع",
      field: "name",
      type: 1
    },
    {
      header: "عنوان الفرع",
      field: "address",
      type: 1
    }
  ]

  gridFilters: DataGridFilter[] = [
    {
      controlName: "name",
      label: "اسم الفرع",
      type: this.filterTypes.text
    },
    {
      controlName: "address",
      label: "عنوان الفرع",
      type: this.filterTypes.text
    }
  ]

  gridActions: DataGridAction = {
    showDetails: true,
    showDelete: true,
    showEdit: true,
  }

  constructor(
    private branchesService: BranchesService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    public authService: AuthService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.getBranchesList()
  }

  getBranchesList() {
    this.branchesService.getBranches().subscribe(res => {
      if (res.isSuccess) {
        this.branchesList = res.data
        this.gridData = res.data
        this.filterData = [...this.gridData]
      }
    })
  }

  setFilteredData(filteredData: any[]) {
    this.gridData = filteredData
  }

  showAddDialog() {
    this.isShowAddDialog = true
  }

  hideAddDialog() {
    this.isShowAddDialog = false
    this.selectedBranchForEdit = undefined
    this.isEdit = false
    this.addBranchComponent.resetAddForm()
  }

  showDetailsDialog(branch: any) {
    this.selectedBranchForDetails = branch
    this.isShowDetailsDialog = true
  }

  hideDetailsDialog() {
    this.isShowDetailsDialog = false
    this.selectedBranchForDetails = undefined
  }

  editBranch(branch: any) {
    debugger
    this.selectedBranchForEdit = branch
    this.isEdit = true
    this.isShowAddDialog = true
  }

  deleteBranch(branch: any) {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف هذا الفرع؟',
      header: 'تأكيد الحذف',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.branchesService.deleteBranch(branch._id!).subscribe(res => {
          if (res.isSuccess) {
            this.alertifyService.success('تم حذف الفرع بنجاح')
            this.getBranchesList()
          } else {
            this.alertifyService.error('حدث خطأ أثناء حذف الفرع')
          }
        })
      }
    });
  }

  onBranchAdded() {
    this.getBranchesList()
    this.hideAddDialog()
  }
}
