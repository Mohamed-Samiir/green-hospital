import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutUsService } from 'src/app/core/services/AboutUsService/about-us.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { AuthService } from '../../../../core/services/auth.service';

interface IAboutUs {
  text: string
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  private aboutUsAr: string = ""
  private aboutUsEn: string = ""

  get aboutUsValueAr() {
    return this.aboutUsAr;
  }

  set aboutUsValueAr(v) {
    this.aboutUsAr = v;
  }

  get aboutUsValueEn() {
    return this.aboutUsEn;
  }

  set aboutUsValueEn(v) {
    this.aboutUsEn = v;
  }

  constructor(private aboutUsService: AboutUsService,
    private alertService: AlertifyService,
    private userService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn())
      this._router.navigate([`/auth/login`]);

    this.aboutUsService.GetAboutUS().subscribe(res => {
      this.aboutUsAr = res.data.descAr
      this.aboutUsEn = res.data.descEn
    })
  }

  onSubmit() {
    this.aboutUsService.UpdateAboutUs({ descAr: this.aboutUsAr, descEn: this.aboutUsEn }).subscribe(res => {
      this.alertService.success("Abot Us Has Been Saved Successfully")
    })
  }

}
