import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from '../../../../core/interfaces/trips/i-group';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { AlertifyService } from '../../../../core/services/alertify-services/alertify.service';
import { GroupsServiceService } from '../../../../core/services/GroupsService/groups-service.service';
import { ConfirmDialogModel, ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-renew-list',
  templateUrl: './renew-list.component.html',
  styleUrls: ['./renew-list.component.css']
})
export class RenewListComponent implements OnInit {
  groups: IGroup[] = []

  constructor(private _goupService: GroupsServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.getGroupsNeedToBeRenewed();
  }
  getGroupsNeedToBeRenewed() {
    this._goupService.getGroupsNeedToBeRenewed().subscribe(
      (res: BaseResponseModel) => {
        if (res.isSuccess) {
          this.groups = res.data as IGroup[]
        }
        else {
          console.log(res.message);
        }
      },
    );
  }
  GoToDetails(id?: string) {
    this._router.navigate([`/main/Renew/renew-trip`], {
      queryParams: {
        id: id,
      }
    });
  }


}
