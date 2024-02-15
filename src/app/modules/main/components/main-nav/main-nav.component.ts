import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isExpanded: boolean = false
  userimgSrc: string = "../../../../../assets/images/driver-image.jpg"

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,
    private router: Router
  ) { }

  toggleExpandNav() {
    this.isExpanded = !this.isExpanded
  }
  Logout() {
    this.authService.logOut();
    this.router.navigate(["/auth"])

  }
}
