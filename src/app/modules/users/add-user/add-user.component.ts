import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from 'src/app/core/interfaces/users/userModel';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnChanges {

  addUserFormGroup: FormGroup = new FormGroup({})

  @Input() selectedUser: UserModel | undefined

  @Output() onAddUser: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'].currentValue) {
      this.addUserFormGroup.patchValue({ ...changes['selectedUser'].currentValue, password: null })
      this.addUserFormGroup.get('password').clearValidators()
      this.addUserFormGroup.get('password').updateValueAndValidity()
    }
  }

  buildForm() {
    this.addUserFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^[\u0621-\u064A ]+$"), Validators.minLength(3), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)]],
      password: [null, [Validators.required]],
      isAdmin: [false, [Validators.required]],
      isActive: [true, [Validators.required]]
    })
  }

  get f() {
    return this.addUserFormGroup.controls
  }

  popupIgnor() {
    this.resetAddForm()
    this.onIgnore.emit()
  }

  resetAddForm() {
    this.addUserFormGroup.reset({ isActive: true })
  }

  Submit() {
    if (this.addUserFormGroup.valid) {
      if (this.selectedUser) {
        this.usersService.editUser(this.addUserFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.EDIT_SUCCESS"))
            this.onAddUser.emit(res.data)
            this.addUserFormGroup.reset({ isActive: true })
          } else {
            this.alertify.error(res.message)
          }
        })
      } else {
        this.usersService.addUser(this.addUserFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.ADD_SUCCESS"))
            this.onAddUser.emit(res.data)
            this.addUserFormGroup.reset({ isActive: true })
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    } else {
      this.addUserFormGroup.markAllAsTouched()
    }

  }
}
