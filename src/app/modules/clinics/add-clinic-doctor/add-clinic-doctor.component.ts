import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Clinic } from 'src/app/core/interfaces/clinic';
import { ClinicDoctor } from 'src/app/core/interfaces/clinic-doctor';
import { DoctorModel } from 'src/app/core/interfaces/doctor/doctor-model';
import { BranchModel } from 'src/app/core/interfaces/branch/branch-model';
import { DoctorsService } from 'src/app/core/services/Doctors/doctors.service';
import { BranchesService } from 'src/app/core/services/branches/branches.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
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
  branchesList: BranchModel[]
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
    private branchesService: BranchesService,
    private clinicDoctorService: ClinicDoctorService,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm()
    this.getDoctorsList()
    this.getBranchesList()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDoctor']?.currentValue) {
      const selectedDoctor = changes['selectedDoctor'].currentValue;

      // Patch all form values
      this.addDoctorFormGroup.patchValue(selectedDoctor);

      // Set doctor field and disable it
      this.f['doctor'].setValue(selectedDoctor.doctorId);
      this.f['doctor'].disable();

      // Handle branches array properly for editing
      if (selectedDoctor.branches && Array.isArray(selectedDoctor.branches)) {
        this.f['branches'].setValue(selectedDoctor.branches);
      } else {
        this.f['branches'].setValue([]);
      }
    }
  }

  buildForm() {
    this.addDoctorFormGroup = this.fb.group({
      clinic: [{ value: null, disabled: true }],
      doctor: [null, [Validators.required]],
      branches: [null], // Optional branches array field
      price: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(0)]],
      acceptInsurance: [true],
      freeVisitFollowup: [true],
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
        this.clinicDoctorService.editClinicDoctor(this.selectedDoctor._id, this.addDoctorFormGroup.getRawValue()).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.EDIT_SUCCESS"))
            this.onAddClinicDoctor.emit(res.data)
            this.resetAddForm()
          } else {
            this.alertify.error(res.message)
          }
        })
      } else {
        this.clinicDoctorService.addClinicDoctor(this.addDoctorFormGroup.getRawValue()).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.ADD_SUCCESS"))
            this.onAddClinicDoctor.emit(res.data)
            this.resetAddForm()
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
    this.addDoctorFormGroup.reset({ acceptInsurance: true, freeVisitFollowup: true, freeOperationFollowup: true })
  }

  getDoctorsList() {
    this.doctorsService.getDoctors().subscribe(res => {
      if (res.isSuccess) {
        this.doctorsList = res.data
      }
    })
  }

  getBranchesList() {
    this.branchesService.getBranches().subscribe(res => {
      if (res.isSuccess) {
        // Filter only active branches
        this.branchesList = res.data.filter((branch: BranchModel) => branch.isActive)
      }
    })
  }

}
