import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BranchModel } from 'src/app/core/interfaces/branch/branch-model';
import { AddBranchModel } from 'src/app/core/interfaces/branch/add-branch-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { BranchesService } from 'src/app/core/services/branches/branches.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
  exportAs: 'addBranch'
})
export class AddBranchComponent implements OnInit, OnChanges {

  @Input() selectedBranch: BranchModel | undefined
  @Input() isEdit: boolean = false
  @Output() branchAdded = new EventEmitter()

  addBranchFormGroup!: FormGroup

  constructor(
    private fb: FormBuilder,
    private branchesService: BranchesService,
    private alertifyService: AlertifyService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBranch'] && this.selectedBranch && this.isEdit) {
      this.populateForm()
    }
  }

  initializeForm() {
    this.addBranchFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    })
  }

  populateForm() {
    if (this.selectedBranch) {
      this.addBranchFormGroup.patchValue({
        name: this.selectedBranch.name,
        address: this.selectedBranch.address
      })
    }
  }

  get f() {
    return this.addBranchFormGroup.controls
  }

  resetAddForm() {
    this.addBranchFormGroup.reset()
    this.selectedBranch = undefined
    this.isEdit = false
  }

  Submit() {
    if (this.addBranchFormGroup.valid) {
      const branchData: AddBranchModel = {
        name: this.f['name'].value,
        address: this.f['address'].value
      }

      if (this.isEdit && this.selectedBranch?._id) {
        this.branchesService.editBranch(this.selectedBranch._id, branchData).subscribe(res => {
          if (res.isSuccess) {
            this.alertifyService.success('تم تعديل الفرع بنجاح')
            this.branchAdded.emit()
            this.resetAddForm()
          } else {
            this.alertifyService.error('حدث خطأ أثناء تعديل الفرع')
          }
        })
      } else {
        this.branchesService.addBranch(branchData).subscribe(res => {
          if (res.isSuccess) {
            this.alertifyService.success('تم إضافة الفرع بنجاح')
            this.branchAdded.emit()
            this.resetAddForm()
          } else {
            this.alertifyService.error('حدث خطأ أثناء إضافة الفرع')
          }
        })
      }
    } else {
      this.alertifyService.error('يرجى ملء جميع الحقول المطلوبة بشكل صحيح')
    }
  }
}
