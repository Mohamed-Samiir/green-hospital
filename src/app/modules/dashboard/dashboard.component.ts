import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResponseModel } from '../../core/ng-model/base-response-model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: AuthService, private _router: Router) { }
  tripsCount: number = 0;
  ngOnInit(): void {
    // if (!this.userService.isLoggedIn())
    //   this._router.navigate([`/auth/login`]);
  }

}
