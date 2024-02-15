import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseResponseModel } from '../../ng-model/base-response-model';

@Injectable({
  providedIn: 'root'
})
export class FilesServiceService {

  FileUploadURL = environment.baseURL + "Attachment/upload-file"

  constructor(private http: HttpClient) { }

  UploadFile(file: File) {
    let formData = new FormData()
    formData.append("file", file);
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.post<BaseResponseModel>(this.FileUploadURL, formData, { headers })
  }

}
