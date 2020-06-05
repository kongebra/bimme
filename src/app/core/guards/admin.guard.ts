import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((user) => (user && user.roles.admin ? true : false)),
      tap((isAdmin) => {
        if (!isAdmin) {
          console.error('Access denied - Admins only');
          this.router.navigate(['/']);
        }
      })
    );
  }
}
