import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorModel } from 'src/app/core/interfaces/doctor/doctor-model';
import { DoctorsService } from 'src/app/core/services/Doctors/doctors.service';
import { SpecializationsService } from 'src/app/core/services/specializations/specializations.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
  exportAs: 'addDoctor'
})
export class AddDoctorComponent implements OnInit {

  addDoctorFormGroup: FormGroup = new FormGroup({})
  specializationsList: any[] = []
  subSpecializationsList: any[] = []
  @Output() onAddDoctor: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private specializationsService: SpecializationsService,
    private doctorsService: DoctorsService
  ) { }

  ngOnInit() {
    this.buildForm()
    this.getSpecializations()
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
    debugger
    if (this.addDoctorFormGroup.valid) {
      this.doctorsService.addDoctor(this.addDoctorFormGroup.value).subscribe(res => {
        if (res.isSuccess) {
          this.onAddDoctor.emit(res.data)
          this.addDoctorFormGroup.reset({ isActive: true })
        }
      })
    } else {
      this.addDoctorFormGroup.markAllAsTouched()
    }

  }

  emitIgnore() {
    this.addDoctorFormGroup.reset({ isActive: true })
    this.onIgnore.emit()
  }

}
