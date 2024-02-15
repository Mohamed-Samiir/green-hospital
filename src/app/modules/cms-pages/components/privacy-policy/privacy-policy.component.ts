import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { PrivacyService } from 'src/app/core/services/privacyService/privacy.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  private clientPrivacyAr: string = ""
  private clientPrivacyEn: string = ""
  private driverPrivacyAr: string = ""
  private driverPrivacyEn: string = ""

  get clientPrivacyValueAr() {
    return this.clientPrivacyAr;
  }

  set clientPrivacyValueAr(v) {
    this.clientPrivacyAr = v;
  }

  get clientPrivacyValueEn() {
    return this.clientPrivacyEn;
  }

  set clientPrivacyValueEn(v) {
    this.clientPrivacyEn = v;
  }

  get driverPrivacyValueAr() {
    return this.driverPrivacyAr;
  }

  set driverPrivacyValueAr(v) {
    this.driverPrivacyAr = v;
  }

  get driverPrivacyValueEn() {
    return this.driverPrivacyEn;
  }

  set driverPrivacyValueEn(v) {
    this.driverPrivacyEn = v;
  }

  constructor(private privacyService: PrivacyService, private alertService: AlertifyService,private userService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn())
      this._router.navigate([`/auth/login`]);
    this.privacyService.GetClientPRivacy().subscribe(res => {
      this.clientPrivacyAr = res.data.descAr
      this.clientPrivacyEn = res.data.descEn
    })

    this.privacyService.GetDriverPrivacy().subscribe(res => {
      this.driverPrivacyAr = res.data.descAr
      this.driverPrivacyEn = res.data.descEn
    })
  }

  onSubmit() {
    this.privacyService.UpdateClientPrivacy({ descAr: this.clientPrivacyAr, descEn: this.clientPrivacyEn }).subscribe(res => {
      this.privacyService.UpdateDriverPrivacy({ descAr: this.driverPrivacyAr, descEn: this.driverPrivacyEn }).subscribe(response => {
        this.alertService.success("Privacy Policies Has Been Saved Successfully")
      })
    })
  }

}
