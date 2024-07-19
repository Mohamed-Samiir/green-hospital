import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DoctorModel } from 'src/app/core/interfaces/doctor/doctor-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { DoctorsService } from 'src/app/core/services/Doctors/doctors.service';
import { SpecializationsService } from 'src/app/core/services/specializations/specializations.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
  exportAs: 'addDoctor'
})
export class AddDoctorComponent implements OnInit, OnChanges {

  addDoctorFormGroup: FormGroup = new FormGroup({})
  specializationsList: any[] = []
  subSpecializationsList: any[] = []

  @Input() selectedDoctor: DoctorModel | undefined

  @Output() onAddDoctor: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private specializationsService: SpecializationsService,
    private doctorsService: DoctorsService,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm()
    this.getSpecializations()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDoctor'].currentValue) {
      let doctorSpecialization = changes['selectedDoctor'].currentValue.specialization
      if (doctorSpecialization) {
        this.subSpecializationsList = doctorSpecialization.subSpecializations
      }
      let doctorObj = {
        ...changes['selectedDoctor'].currentValue,
        specialization: doctorSpecialization._id,
        subSpecializations: changes['selectedDoctor'].currentValue.subSpecializations.map((subSpec: any) => subSpec._id)
      }
      this.addDoctorFormGroup.patchValue(doctorObj)
    }
  }

  buildForm() {
    this.addDoctorFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^[\u0621-\u064A ]+$"), Validators.minLength(3), Validators.maxLength(100)]],
      degree: [null, [Validators.required, Validators.pattern("^[\u0621-\u064A0-9 ]+$"), Validators.minLength(3), Validators.maxLength(100)]],
      specialization: [null, [Validators.required]],
      subSpecializations: [null, [Validators.required]],
      isActive: [true]
    })
  }

  get f() {
    return this.addDoctorFormGroup.controls
  }

  getSpecializations() {
    this.specializationsService.getSpecializations().subscribe(res => {
      if (res.isSuccess) {
        this.specializationsList = res.data
      }
    })
  }

  changeSpecialization() {
    let subSpecs = this.specializationsList.find(spec => spec._id == this.f['specialization'].value)
    if (subSpecs && subSpecs.subSpecializations.length) {
      this.subSpecializationsList = subSpecs.subSpecializations
    }
  }

  Submit() {
    if (this.addDoctorFormGroup.valid) {
      if (this.selectedDoctor) {
        this.doctorsService.editDoctor(this.selectedDoctor._id, this.addDoctorFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.EDIT_SUCCESS"))
            this.onAddDoctor.emit(res.data)
            this.addDoctorFormGroup.reset({ isActive: true })
          } else {
            this.alertify.error(res.message)
          }
        })
      } else {
        this.doctorsService.addDoctor(this.addDoctorFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.ADD_SUCCESS"))
            this.onAddDoctor.emit(res.data)
            this.addDoctorFormGroup.reset({ isActive: true })
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    } else {
      this.addDoctorFormGroup.markAllAsTouched()
    }

  }

  popupIgnor() {
    this.resetAddForm()
    this.onIgnore.emit()
  }

  resetAddForm() {
    this.addDoctorFormGroup.reset({ isActive: true })
  }

}
