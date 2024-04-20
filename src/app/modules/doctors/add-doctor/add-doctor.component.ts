import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationsService } from 'src/app/core/services/specializations/specializations.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
  exportAs: 'addDoctor'
})
export class AddDoctorComponent implements OnInit {

  addDoctorFormGroup: FormGroup = new FormGroup({})
  specializationsList: any[] = [
    {
      name: "عظام",
      id: 1
    },
    {
      name: "باطنة",
      id: 2
    }
  ]

  subSpecializationsList: any[] = [
    {
      name: "عظام",
      id: 1
    },
    {
      name: "باطنة",
      id: 2
    }
  ]

  constructor(private fb: FormBuilder, private specializationsService: SpecializationsService) { }

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
      this.specializationsList = res.data
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

    } else {
      this.addDoctorFormGroup.markAllAsTouched()
    }

  }

}
