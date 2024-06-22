import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clinic } from 'src/app/core/interfaces/clinic';
import { ClinicDoctor } from 'src/app/core/interfaces/clinic-doctor';
import { DoctorModel } from 'src/app/core/interfaces/doctor/doctor-model';
import { DoctorsService } from 'src/app/core/services/Doctors/doctors.service';
import { ClinicDoctorService } from 'src/app/core/services/clinics/clinic-doctor.service';

@Component({
  selector: 'app-add-clinic-doctor',
  templateUrl: './add-clinic-doctor.component.html',
  styleUrls: ['./add-clinic-doctor.component.css']
})
export class AddClinicDoctorComponent implements OnInit, OnChanges {
  @Input() clinic: Clinic = null
  @Input() selectedDoctor: ClinicDoctor = null
  @Output() onAddClinicDoctor: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()
  addDoctorFormGroup: FormGroup = new FormGroup({})
  doctorsList: DoctorModel[]
  clinicsList: Clinic[]
  ageUnits = [
    {
      id: 1,
      name: "يوم"
    },
    {
      id: 2,
      name: "شهر"
    },
    {
      id: 3,
      name: "سنة"
    }
  ]

  constructor(
    private fb: FormBuilder,
    private doctorsService: DoctorsService,
    private clinicDoctorService: ClinicDoctorService
  ) { }

  ngOnInit() {
    this.buildForm()
    this.getDoctorsList()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDoctor'].currentValue) {
      debugger
      this.addDoctorFormGroup.patchValue(changes['selectedDoctor'].currentValue)
      this.f['doctor'].setValue(changes['selectedDoctor'].currentValue.doctorId)
      this.f['doctor'].disable()
    }
  }

  buildForm() {
    this.addDoctorFormGroup = this.fb.group({
      clinic: [{ value: null, disabled: true }],
      doctor: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(0)]],
      acceptInsurance: [true],
      freeVisitFollowup: [true],
      freeOperationFollowup: [true],
      ageFrom: [1, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(1), Validators.max(100)]],
      ageFromUnit: [3, [Validators.required]],
      ageTo: [1, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(1), Validators.max(100)]],
      ageToUnit: [3, [Validators.required]],
      notes: [null]
    })
  }

  get f() {
    return this.addDoctorFormGroup.controls
  }

  Submit() {
    this.f['clinic'].setValue(this.clinic._id)
    if (this.addDoctorFormGroup.valid) {
      if (this.selectedDoctor) {
        debugger

        this.clinicDoctorService.editClinicDoctor(this.selectedDoctor._id, this.addDoctorFormGroup.getRawValue()).subscribe(res => {
          if (res.isSuccess) {
            this.onAddClinicDoctor.emit(res.data)
            this.resetAddForm()
          }
        })
      } else {
        this.clinicDoctorService.addClinicDoctor(this.addDoctorFormGroup.getRawValue()).subscribe(res => {
          if (res.isSuccess) {
            this.onAddClinicDoctor.emit(res.data)
            this.resetAddForm()
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
    this.addDoctorFormGroup.reset({ acceptInsurance: true, freeVisitFollowup: true, freeOperationFollowup: true })
  }

  getDoctorsList() {
    this.doctorsService.getDoctors().subscribe(res => {
      if (res.isSuccess) {
        this.doctorsList = res.data
      }
    })
  }

}
