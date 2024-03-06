import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  apiCallsCount: number = 0
  currentRoute: string = ""
  routesWhiteList: string[] = [
    '/home',
  ]
  constructor(private loaderService: LoaderService, private route: Router) {
    route.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.currentRoute = ev.url
      }
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.apiCallsCount++
    if (!this.routesWhiteList.includes(this.currentRoute)) {
      this.loaderService.show();
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.apiCallsCount--
        if (this.apiCallsCount == 0) {
          this.loaderService.hide()
        }
      }),
    );
  }
}
