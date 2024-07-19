import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Department } from 'src/app/core/interfaces/department';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { DepartmentsService } from 'src/app/core/services/departments/departments.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  @Input() selectedDepartment: Department | undefined
  @Output() onAddDepartment: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  addDepartmentFormGroup: FormGroup = new FormGroup({})
  isRepeated: boolean = false
  phoneNumbers: string[] = []

  constructor(
    private fb: FormBuilder,
    private departmentsService: DepartmentsService,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDepartment'].currentValue) {
      this.addDepartmentFormGroup.patchValue(changes['selectedDepartment'].currentValue)
      this.phoneNumbers = changes['selectedDepartment'].currentValue.phoneNumbers
    }
  }

  buildForm() {
    this.addDepartmentFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^[\u0621-\u064A ]+$"), Validators.minLength(3), Validators.maxLength(100)]],
      contactPeriods: [null, [Validators.required, Validators.pattern("^[\u0621-\u064A0-9 ]+$"), Validators.minLength(3), Validators.maxLength(255)]],
      phoneNumber: [null],
      allowContact: [true]
    })
  }

  get f() {
    return this.addDepartmentFormGroup.controls
  }

  Submit() {
    if (this.addDepartmentFormGroup.valid) {
      let addDepartmentObj: Department = {
        name: this.addDepartmentFormGroup.get("name").value,
        contactPeriods: this.addDepartmentFormGroup.get("contactPeriods").value,
        allowContact: this.addDepartmentFormGroup.get("allowContact").value,
        phoneNumbers: this.phoneNumbers
      }
      if (this.selectedDepartment) {
        this.departmentsService.editDepartment(this.selectedDepartment._id, addDepartmentObj).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.EDIT_SUCCESS"))
            this.onAddDepartment.emit(res.data)
            this.addDepartmentFormGroup.reset({ allowContact: true })
            this.phoneNumbers = []
          } else {
            this.alertify.error(res.message)
          }
        })
      } else {
        this.departmentsService.addDepartment(addDepartmentObj).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.ADD_SUCCESS"))
            this.onAddDepartment.emit(res.data)
            this.addDepartmentFormGroup.reset({ allowContact: true })
            this.phoneNumbers = []
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    } else {
      this.addDepartmentFormGroup.markAllAsTouched()
    }

  }

  changePhoneInput() {
    this.isRepeated = false
  }

  addPhoneNumber() {
    if (this.f['phoneNumber'].value) {
      let nameExists = this.phoneNumbers.filter(phone => phone.trim() == String(this.f['phoneNumber'].value).trim())
      if (nameExists.length) {
        this.isRepeated = true
      } else {
        this.phoneNumbers.push(this.f['phoneNumber'].value)
        this.f['phoneNumber'].reset()
      }
    }
  }

  deletePhoneNumber(index: number) {
    this.phoneNumbers.splice(index, 1)
  }

  popupIgnor() {
    this.resetAddForm()
    this.onIgnore.emit()
  }

  resetAddForm() {
    this.addDepartmentFormGroup.reset({ isActive: true })
  }

}
