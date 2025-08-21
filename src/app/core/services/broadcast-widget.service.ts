import {
  Injectable
}

  from '@angular/core';

import {
  BehaviorSubject,
  Observable
}

  from 'rxjs';

import {
  Router,
  NavigationEnd
}

  from '@angular/router';

import {
  filter
}

  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}

) export class BroadcastWidgetService {
  // Widget state management
  private isExpandedSubject = new BehaviorSubject<boolean>(false);
  private isVisibleSubject = new BehaviorSubject<boolean>(true);
  private unreadCountSubject = new BehaviorSubject<number>(0);

  // Public observables
  public isExpanded$ = this.isExpandedSubject.asObservable();
  public isVisible$ = this.isVisibleSubject.asObservable();
  public unreadCount$ = this.unreadCountSubject.asObservable();

  // Routes where widget should be hidden
  private hiddenRoutes = ['/auth/login',
    '/auth/register',
    '/auth'];

  constructor(private router: Router) {
    this.initializeRouteListener();
    this.loadWidgetState();
  }

  /**
   * Initialize router listener to control widget visibility
   */
  private initializeRouteListener(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      const navigationEndEvent = event as NavigationEnd;
      this.updateVisibilityBasedOnRoute(navigationEndEvent.url);
    }

    );
  }

  /**
   * Update widget visibility based on current route
   */
  private updateVisibilityBasedOnRoute(url: string): void {
    const shouldHide = this.hiddenRoutes.some(route => url.startsWith(route) || url === route);
    this.setVisibility(!shouldHide);
  }

  /**
   * Load widget state from session storage
   */
  private loadWidgetState(): void {
    const savedState = sessionStorage.getItem('broadcastWidgetExpanded');

    if (savedState !== null) {
      this.isExpandedSubject.next(JSON.parse(savedState));
    }
  }

  /**
   * Save widget state to session storage
   */
  private saveWidgetState(isExpanded: boolean): void {
    sessionStorage.setItem('broadcastWidgetExpanded', JSON.stringify(isExpanded));
  }

  /**
   * Toggle widget expanded/collapsed state
   */
  public toggleExpanded(): void {
    const newState = !this.isExpandedSubject.value;
    this.isExpandedSubject.next(newState);
    this.saveWidgetState(newState);
  }

  /**
   * Set widget expanded state
   */
  public setExpanded(isExpanded: boolean): void {
    this.isExpandedSubject.next(isExpanded);
    this.saveWidgetState(isExpanded);
  }

  /**
   * Set widget visibility
   */
  public setVisibility(isVisible: boolean): void {
    this.isVisibleSubject.next(isVisible);
  }

  /**
   * Update unread messages count
   */
  public updateUnreadCount(count: number): void {
    this.unreadCountSubject.next(count);
  }

  /**
   * Get current expanded state
   */
  public get isExpanded(): boolean {
    return this.isExpandedSubject.value;
  }

  /**
   * Get current visibility state
   */
  public get isVisible(): boolean {
    return this.isVisibleSubject.value;
  }

  /**
   * Get current unread count
   */
  public get unreadCount(): number {
    return this.unreadCountSubject.value;
  }

  /**
   * Clear unread count (when user views messages)
   */
  public clearUnreadCount(): void {
    this.unreadCountSubject.next(0);
  }

  /**
   * Expand widget and clear unread count (when user opens widget)
   */
  public openWidget(): void {
    this.setExpanded(true);
    this.clearUnreadCount();
  }

  /**
   * Add route to hidden routes list
   */
  public addHiddenRoute(route: string): void {
    if (!this.hiddenRoutes.includes(route)) {
      this.hiddenRoutes.push(route);
    }
  }

  /**
   * Remove route from hidden routes list
   */
  public removeHiddenRoute(route: string): void {
    const index = this.hiddenRoutes.indexOf(route);

    if (index > -1) {
      this.hiddenRoutes.splice(index, 1);
    }
  }
}