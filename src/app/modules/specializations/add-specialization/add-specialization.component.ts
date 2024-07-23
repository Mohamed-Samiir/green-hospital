import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Specialization } from 'src/app/core/interfaces/specialization';
import { SubSpecialization } from 'src/app/core/interfaces/sub-specialization';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { SpecializationsService } from 'src/app/core/services/specializations/specializations.service';

@Component({
  selector: 'app-add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.css']
})
export class AddSpecializationComponent implements OnInit, OnChanges {

  addSpecFormGroup: FormGroup = new FormGroup({})
  subSpecs: SubSpecialization[] = []
  isRepeated: boolean = false
  mustAddSubSpecs: boolean = false

  @Input() selectedSpec: Specialization | undefined

  @Output() onAddSpec: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private specializationsService: SpecializationsService,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedSpec'].currentValue) {
      this.f['name'].setValue(changes['selectedSpec'].currentValue.name)
      this.subSpecs = changes['selectedSpec'].currentValue.subSpecializations.map((subSpec: any) => {
        return { name: subSpec.name }
      })
    }
  }

  get f() {
    return this.addSpecFormGroup.controls
  }

  buildForm() {
    this.addSpecFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      subSpecName: [null, [Validators.minLength(3), Validators.maxLength(100)]],
    })
  }

  popupIgnor() {
    this.resetAddForm()
    this.onIgnore.emit()
  }

  resetAddForm() {
    this.addSpecFormGroup.reset({ isActive: true })
  }

  addSubSpec() {
    if (this.f['subSpecName'].value) {
      let nameExists = this.subSpecs.filter(subSpec => String(subSpec.name).trim() == String(this.f['subSpecName'].value).trim())
      if (nameExists.length) {
        this.isRepeated = true
      } else {
        let subSpec: SubSpecialization = {
          name: this.f['subSpecName'].value
        }
        this.subSpecs.push(subSpec)
        this.f['subSpecName'].reset()
      }
    }
  }

  deleteSubSpec(index: number) {
    this.subSpecs.splice(index, 1)
  }

  changeSubSpecInput() {
    this.isRepeated = false
  }

  Submit() {
    if (this.addSpecFormGroup.valid) {
      if (this.subSpecs.length) {
        let model: Specialization = {
          name: this.f['name'].value,
          subSpecializations: this.subSpecs
        }

        if (this.selectedSpec) {
          this.specializationsService.editSpecialization(this.selectedSpec._id, model).subscribe(res => {
            if (res.isSuccess) {
              this.alertify.success(this.translate.instant("GENERIC.EDIT_SUCCESS"))
              this.onAddSpec.emit()
              this.addSpecFormGroup.reset()
              this.subSpecs = []
            } else {
              this.alertify.error(res.message)
            }
          })
        } else {
          this.specializationsService.addSpecialization(model).subscribe(res => {
            if (res.isSuccess) {
              this.alertify.success(this.translate.instant("GENERIC.ADD_SUCCESS"))
              this.onAddSpec.emit()
              this.addSpecFormGroup.reset()
              this.subSpecs = []
            } else {
              this.alertify.error(res.message)
            }
          })
        }

      } else {
        this.mustAddSubSpecs = true
      }
    } else {
      this.addSpecFormGroup.markAllAsTouched()
    }
  }
}
