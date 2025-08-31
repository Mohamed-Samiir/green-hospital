import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Clinic } from 'src/app/core/interfaces/clinic';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ClinicService } from 'src/app/core/services/clinics/clinic.service';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
})
export class AddClinicComponent implements OnInit, OnChanges {

  addClinicFormGroup: FormGroup

  @Input() clinic: Clinic = null
  @Output() onAddClinic: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clinic'].currentValue) {
      this.addClinicFormGroup.patchValue(changes['clinic'].currentValue)
    }
  }

  buildForm() {
    this.addClinicFormGroup = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]]
    })
  }

  get f() {
    return this.addClinicFormGroup.controls
  }

  Submit() {
    if (this.addClinicFormGroup.valid) {
      if (this.clinic) {
        let editClinicObj: Clinic = {
          clinicName: this.f['name'].value
        }
        this.clinicService.editClinic(this.clinic._id, editClinicObj).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.EDIT_SUCCESS"))
            this.onAddClinic.emit(res.data)
            this.resetAddForm()
          } else {
            this.alertify.error(res.message)
          }
        })
      } else {
        this.clinicService.addClinic(this.addClinicFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.ADD_SUCCESS"))
            this.onAddClinic.emit(res.data)
            this.resetAddForm()
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    } else {
      this.addClinicFormGroup.markAllAsTouched()
    }
  }

  popupIgnor() {
    this.resetAddForm()
    this.onIgnore.emit()
  }

  resetAddForm() {
    this.addClinicFormGroup.reset({ acceptInsurance: true, freeVisitFollowup: true })
  }

}
