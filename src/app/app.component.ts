import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['en-lang', 'ar-lang']);
    translate.setDefaultLang('ar-lang');
    translate.use('ar-lang');
  }
  title = 'TriptaFE';
}
