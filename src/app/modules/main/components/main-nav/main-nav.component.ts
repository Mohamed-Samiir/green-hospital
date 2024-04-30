import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { faUserDoctor, faHouseUser, faStethoscope, faSitemap, faUsers } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isExpanded: boolean = false
  userimgSrc: string = "../../../../../assets/images/driver-image.jpg"
  faUserDoctor = faUserDoctor
  faHouseUser = faHouseUser
  faStethoscope = faStethoscope
  faSitemap = faSitemap
  faUsers = faUsers

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,
    private router: Router, public sideNavService: SideNavService
  ) { }

  ngOnInit(): void {
    this.isExpanded = this.sideNavService.getIsExpanded()
  }

  toggleExpandNav() {
    this.isExpanded = this.sideNavService.toggleSideNav()
  }
  Logout() {
    this.authService.logOut();
    this.router.navigate(["/auth"])

  }
}
