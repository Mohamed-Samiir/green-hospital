import { Component, OnInit } from '@angular/core';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { Question } from 'src/app/core/interfaces/question';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions/questions.service';
import { faPenToSquare, faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons';
import { DataGridFilter } from 'src/app/core/interfaces/data-grid-filter';
import { FilterTypes } from 'src/app/core/enums/filter-types.enum';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  questionsList: Question[] = []
  gridData: Question[] = []
  filterData: Question[] = []
  isShowAddQuestionDialog: boolean = false
  filterTypes = FilterTypes
  selectedQuestionForEdit: Question
  isEdit: boolean = false

  gridFilters: DataGridFilter[] = [
    {
      controlName: "question",
      label: "السؤال",
      type: this.filterTypes.text
    }
  ]

  gridActions: DataGridAction = {
    showDetails: false,
    showDelete: true,
    showEdit: true,
  }

  faPenToSquare = faPenToSquare
  faTrashCan = faTrashCan
  faLock = faLock

  constructor(
    private questionsService: QuestionsService,
    public authService: AuthService,
    private confirmationService: ConfirmationService,
    private tranlslate: TranslateService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.getQuestions()
  }

  getQuestions() {
    this.questionsService.getQuestions().subscribe(res => {
      if (res.isSuccess) {
        this.questionsList = res.data
        this.gridData = res.data
        this.filterData = res.data
      }
    })
  }

  setFilteredData(filteredData: any[]) {
    this.gridData = filteredData
  }

  showAddQuestionDialog() {
    this.isShowAddQuestionDialog = true
  }

  hideAddQuestionDialog() {
    this.isShowAddQuestionDialog = false
  }

  onAddQuestion(event: any) {
    this.hideAddQuestionDialog()
    this.getQuestions()
  }

  openEditPopup(event: any, questionId: string) {
    event.stopPropagation()
    this.isEdit = true
    let selectedQuestion = this.questionsList.find(ques => ques._id == questionId)
    if (selectedQuestion) {
      this.selectedQuestionForEdit = selectedQuestion
      this.showAddQuestionDialog()
    }

  }

  openDeleteConfirmation(event: any, questionId: string) {
    event.stopPropagation()
    this.confirmationService.confirm({
      key: "confirmDelete",
      message: `${this.tranlslate.instant('GENERIC.DELETE_MSG')} ${this.tranlslate.instant('QUESTIONS.QUESTION_TITLE')}`,
      acceptLabel: this.tranlslate.instant('GENERIC.CONFIRM'),
      rejectLabel: this.tranlslate.instant('GENERIC.IGNORE'),
      accept: () => {
        this.questionsService.deleteQuestion(questionId).subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(this.tranlslate.instant('GENERIC.DELETE_SUCCESS'))
            this.getQuestions()
          } else {
            this.alertify.error(res.message)
          }
        })
      }
    });
  }

}
