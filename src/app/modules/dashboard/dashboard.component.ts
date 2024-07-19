import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResponseModel } from '../../core/ng-model/base-response-model';
import { AuthService } from '../../core/services/auth.service';
import { DataGridDdlsService } from 'src/app/core/services/dataGrid/data-grid-ddls.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  shortcutsList: any[] = []
  faTrash = faTrash

  constructor(
    private userService: AuthService,
    private _router: Router,
    private dataGridDdlsService: DataGridDdlsService,
    public confirmationService: ConfirmationService,
    private tranlslate: TranslateService,
  ) { }

  ngOnInit(): void {
    // if (!this.userService.isLoggedIn())
    //   this._router.navigate([`/auth/login`]);
    this.getUserShortcuts()
  }

  getUserShortcuts() {
    this.dataGridDdlsService.getUserShortcuts().subscribe(res => {
      if (res.isSuccess) {
        this.shortcutsList = res.data
      }
    })
  }

  deleteShortcut(event: any, shortcut: any) {
    event.stopPropagation()
    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${shortcut?.name}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.dataGridDdlsService.deleteShortcut(shortcut._id).subscribe(res => {
          if (res.isSuccess) {
            this.getUserShortcuts()
          }
        })
      }
    });
  }

  openShortcut(shortcut: any) {
    let queryParams: Object = {}
    shortcut.filters.forEach((param: any) => {
      queryParams[param.label as keyof Object] = param.value
    })


    this._router.navigate([shortcut.route], { queryParams: queryParams, queryParamsHandling: 'merge' })
  }

}
