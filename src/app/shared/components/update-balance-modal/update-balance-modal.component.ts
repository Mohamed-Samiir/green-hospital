import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilesServiceService } from 'src/app/core/services/FilesService/files-service.service';

@Component({
  selector: 'app-update-balance-modal',
  templateUrl: './update-balance-modal.component.html',
  styleUrls: ['./update-balance-modal.component.css']
})
export class UpdateBalanceModalComponent implements OnInit {

  title: string = "";
  isDriver: boolean = true;
  value: number = 1
  isDeduction: boolean = true
  isSalary: boolean = false
  fileName: string = ""
  file: File = new File([], "") || undefined

  constructor(public dialogRef: MatDialogRef<UpdateBalanceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: UpdateBalanceDialogModel, private fileService: FilesServiceService) {
    this.title = model.title;
    this.isDriver = model.isDriver;
    this.isDeduction = model.isDeduction
  }

  ngOnInit(): void {
  }
  onConfirm(): void {
    let outputObj = {
      value: this.value,
      file: this.file.name ? this.file : null,
      isSalary: this.isSalary
    }
    this.dialogRef.close(outputObj);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  get updatValue() {
    return this.value
  }
  set updatValue(value: number) {
    this.value = value
  }

  get updatIsSalary() {
    return this.isSalary
  }
  set updatIsSalary(value: boolean) {
    this.isSalary = value
  }

  onFileSelected(e: any) {
    this.file = e.target.files[0];

  }
}



export class UpdateBalanceDialogModel {
  constructor(public title: string, public isDriver: boolean, public isDeduction: boolean) { }
}
