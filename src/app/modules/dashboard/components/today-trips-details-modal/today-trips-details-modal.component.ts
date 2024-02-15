import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-today-trips-details-modal',
  templateUrl: './today-trips-details-modal.component.html',
  styleUrls: ['./today-trips-details-modal.component.css']
})
export class TodayTripsDetailsModalComponent implements OnInit {




  title: string = "";
  groups: any;
  constructor(public dialogRef: MatDialogRef<TodayTripsDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: TodayTripsDetailsDialogModel) {
    this.title = model.title;
    this.groups = model.groups;
  }

  ngOnInit(): void {
  }
  onConfirm(): void {
    // return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    //  return false
    this.dialogRef.close(false);
  }
}



export class TodayTripsDetailsDialogModel {
  constructor(public title: string, public groups: any) { }
}
