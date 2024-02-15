import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/core/interfaces/trips/i-group';
import { BaseResponseModel } from '../../../../core/ng-model/base-response-model';
import { GroupsServiceService } from '../../../../core/services/GroupsService/groups-service.service';

@Component({
  selector: 'app-manage-recursive-groups',
  templateUrl: './manage-recursive-groups.component.html',
  styleUrls: ['./manage-recursive-groups.component.css']
})
export class ManageRecursiveGroupsComponent implements OnInit {

  groups: IGroup[] = []

  constructor(private _goupService: GroupsServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.getGroups();
  }
  getGroups() {
    this._goupService.GetGroups().subscribe(
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
  //routerLink="/main/trips/recursive/group?id={{group.id}}"
  //GoToDetails(id: string) {
  //  this._router.navigate([`/main/drivers/requestDetails`], {
  //    queryParams: {
  //      id: id,
  //    }
  //  });
  //}
  GoToDetails(id?: string) {
    this._router.navigate([`/main/trips/recursive/group`], {
      queryParams: {
        id: id,
      }
    });
  }
}
