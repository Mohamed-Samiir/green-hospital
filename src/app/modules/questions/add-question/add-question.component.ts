import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Question } from 'src/app/core/interfaces/question';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { QuestionsService } from 'src/app/core/services/questions/questions.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  @Input() selectedQuestion: Question
  addQuestionFormGroup: FormGroup
  @Output() onAddQuestion: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedQuestion'].currentValue) {
      this.addQuestionFormGroup.patchValue(changes['selectedQuestion'].currentValue)
    }
  }

  buildForm() {
    this.addQuestionFormGroup = this.fb.group({
      question: ["", [Validators.required, Validators.minLength(3)]],
      answer: ["", [Validators.required, Validators.minLength(3)]],
    })
  }

  get f() {
    return this.addQuestionFormGroup.controls
  }

  Submit() {
    if (this.addQuestionFormGroup.valid) {
      if (this.selectedQuestion) {
        this.questionsService.editQuestion(this.selectedQuestion._id, this.addQuestionFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.ADD_SUCCESS"))
            this.onAddQuestion.emit(res.data)
            this.resetAddForm()
          } else {
            this.alertify.error(res.message)
          }
        })
      } else {
        this.questionsService.addQuestion(this.addQuestionFormGroup.value).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.translate.instant("GENERIC.EDIT_SUCCESS"))
            this.onAddQuestion.emit(res.data)
            this.resetAddForm()
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    } else {
      this.addQuestionFormGroup.markAllAsTouched()
    }
  }

  popupIgnor() {
    this.resetAddForm()
    this.onIgnore.emit()
  }

  resetAddForm() {
    this.addQuestionFormGroup.reset()
  }
}
