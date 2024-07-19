import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';
import { Procedure } from '../../interfaces/procedure';
import { Question } from '../../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  GetQuestionsURL = environment.baseURL + 'questions/getQuestions';
  AddQuestionURL = environment.baseURL + 'questions/addQuestion';
  EditQuestionURL = environment.baseURL + 'questions/editQuestion';
  DeleteQuestionURL = environment.baseURL + 'questions/deleteQuestion';


  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get<BaseResponseModel>(this.GetQuestionsURL);
  }

  addQuestion(questionObj: Question) {
    return this.http.post<BaseResponseModel>(this.AddQuestionURL, questionObj);
  }

  editQuestion(questionId: string, questionObj: Procedure) {
    return this.http.post<BaseResponseModel>(`${this.EditQuestionURL}/${questionId}`, questionObj);
  }

  deleteQuestion(questionId: string) {
    return this.http.delete<BaseResponseModel>(`${this.DeleteQuestionURL}/${questionId}`);
  }
}
