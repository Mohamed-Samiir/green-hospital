import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  title: string = "";
  message: string = "";

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: ConfirmDialogModel) {
    this.title = model.title;
    this.message = model.message;
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



export class ConfirmDialogModel{
  constructor(public title: string, public message: string) {}
}
