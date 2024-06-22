import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { UserModel } from 'src/app/core/interfaces/users/userModel';
import { UsersService } from 'src/app/core/services/users/users.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList: any[] = []
  gridData: any[] = []
  filterTypes = FilterTypes
  isShowAddDialog: boolean = false
  isShowDetailsDialog: boolean = false
  isEdit: boolean = false
  selectedUserForEdit: UserModel | undefined
  @ViewChild(AddUserComponent) addUserComponent!: AddUserComponent

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    public tranlslate: TranslateService
  ) { }

  gridColumns: DataGridColumn[] = [
    {
      header: "اسم المستخدم",
      field: "name",
      type: 1
    },
    {
      header: "البريد الإلكتروني",
      field: "email",
      type: 1
    },
    {
      header: "مدير",
      field: "isAdmin",
      type: 3
    },
    {
      header: "مفعل",
      field: "isActive",
      type: 3
    }
  ]

  gridFilters: DataGridFilter[] = [
    {
      controlName: "name",
      label: "اسم المستخدم",
      type: this.filterTypes.text
    },
    {
      controlName: "email",
      label: "البريد الإلكتروني",
      type: this.filterTypes.text
    }
  ]

  gridActions: DataGridAction = {
    showDetails: false,
    showDelete: true,
    showEdit: true,
  }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.usersService.getUsers().subscribe(res => {
      if (res.isSuccess) {
        this.usersList = res.data
        this.gridData = res.data
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
    this.selectedUserForEdit = undefined
    this.isEdit = false
    this.addUserComponent.resetAddForm()
  }

  openEditPopup(userId: string) {
    debugger
    this.isEdit = true
    let selectedUser = this.usersList.find(user => user._id == userId)
    if (selectedUser) {
      this.selectedUserForEdit = selectedUser
      this.showAddDialog()
    }

  }

  onShowDetails(id: string) {

  }

  openDeleteConfirmation(userId: string) {
    let selectedDoctor = this.usersList.find(user => user._id == userId)
    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${selectedDoctor?.name}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(res => {
          debugger
          if (res.isSuccess) {
            this.getUsers()
          }
        })
      }
    });
  }

  onAddUser() {
    debugger
    this.hideAddDialog()
    this.getUsers()
  }

}
