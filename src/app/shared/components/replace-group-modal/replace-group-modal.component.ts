import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/core/interfaces/trips/i-group';
import { IReassignGroupToDriverModel } from 'src/app/core/interfaces/trips/iReassign-group-to-driver-model';
import { GroupsServiceService } from 'src/app/core/services/GroupsService/groups-service.service';

@Component({
  selector: 'app-replace-group-modal',
  templateUrl: './replace-group-modal.component.html',
  styleUrls: ['./replace-group-modal.component.css']
})
export class ReplaceGroupModalComponent implements OnInit {

  title: string = "";
  selectedDriverId: string = ""
  selectedGroupId: string = ""
  groups: IGroup[] = []
  clientId: string | undefined
  isLoading: boolean = false

  constructor(public dialogRef: MatDialogRef<ReplaceGroupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: ReplaceGroupDialogModel, private groupsService: GroupsServiceService, private _router: Router) {
    this.title = model.title;
    this.groups = model.groups;
    this.clientId = model.clientId
  }

  ngOnInit(): void {

  }
  onConfirm(): void {
    let outputObj = {

    }
    this.dialogRef.close(outputObj);
  }

  onDismiss(): void {
    //  return false
    this.dialogRef.close(false);
  }


  ChangeSelection(event: any, group: any) {
    this.selectedDriverId = event.checked ? event.source.value : ""
    this.selectedGroupId = event.checked ? group.id : ""
  }

  SaveGroup() {
    let model: IReassignGroupToDriverModel = {
      groupDetailsId: this.clientId || "",
      driverId: this.selectedDriverId,
      groupID: this.selectedGroupId
    }
    this.groupsService.ReassignGroupToDriver(model).subscribe(res => {
      console.log(res);
      this._router.navigate([`/main/trips/recursive`]);
    })
    this.dialogRef.close()
  }
}



export class ReplaceGroupDialogModel {
  constructor(public title: string, public groups: IGroup[], public clientId: string | undefined) { }
}
