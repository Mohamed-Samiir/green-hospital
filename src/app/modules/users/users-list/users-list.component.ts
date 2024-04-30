import { Component, OnInit } from '@angular/core';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList: any[] = []
  gridData: any[] = []
  filterTypes = FilterTypes

  constructor(private usersService: UsersService) { }

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
    showDetails: true,
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

  setFilteredData(data: any[]) {

  }

  showAddDialog() {

  }

  openEditPopup(id: string) {

  }

  onShowDetails(id: string) {

  }

  openDeleteConfirmation(id: string) {

  }

}
