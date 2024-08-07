import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Procedure } from 'src/app/core/interfaces/procedure';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { DoctorsService } from 'src/app/core/services/Doctors/doctors.service';
import { ProceduresService } from 'src/app/core/services/procedures/procedures.service';

@Component({
  selector: 'app-add-procedure',
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.css']
})
export class AddProcedureComponent implements OnInit {
  addProcedureFormGroup: FormGroup = new FormGroup({})
  doctorsList: any[] = []
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

  @Input() selectedProcedure: Procedure | undefined
  @Output() onAddProcedure: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private proceduresService: ProceduresService,
    private doctorsService: DoctorsService,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm()
    this.getSpecializations()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProcedure'].currentValue) {
      let doctors = changes['selectedProcedure'].currentValue.doctors
      let procedureObj = {
        ...changes['selectedProcedure'].currentValue,
        doctors: changes['selectedProcedure'].currentValue.doctors.map((doc: any) => doc._id)
      }
      this.addProcedureFormGroup.patchValue(procedureObj)
    }
  }

  buildForm() {
    this.addProcedureFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      doctors: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(0)]],
      acceptInsurance: [true],
      ageFrom: [1, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(1), Validators.max(100)]],
      ageFromUnit: [3, [Validators.required]],
      ageTo: [1, [Validators.required, Validators.pattern("^[1-9][0-9]*$"), Validators.min(1), Validators.max(100)]],
      ageToUnit: [3, [Validators.required]],
      notes: [""]
    })
  }

  get f() {
    return this.addProcedureFormGroup.controls
  }

  getSpecializations() {
    this.doctorsService.getDoctors().subscribe(res => {
      if (res.isSuccess) {
        this.doctorsList = res.data
      }
    })
  }

  Submit() {
    if (this.addProcedureFormGroup.valid) {
      if (this.selectedProcedure) {
        this.proceduresService.editProcedure(this.selectedProcedure._id, this.addProcedureFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.EDIT_SUCCESS"))
            this.onAddProcedure.emit(res.data)
            this.addProcedureFormGroup.reset({ isActive: true })
          } else {
            this.alertify.error(res.message)
          }
        })
      } else {
        this.proceduresService.addProcedure(this.addProcedureFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.ADD_SUCCESS"))
            this.onAddProcedure.emit(res.data)
            this.addProcedureFormGroup.reset({ isActive: true })
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    } else {
      this.addProcedureFormGroup.markAllAsTouched()
    }

  }

  popupIgnor() {
    this.resetAddForm()
    this.onIgnore.emit()
  }

  resetAddForm() {
    this.addProcedureFormGroup.reset({ acceptInsurance: true })
  }

}
