import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuth!: boolean;
  constructor(private authservice: AuthService,
    private router: Router) { }
  canActivate(): boolean {
    this.isAuth=this.authservice.loggedIn();
    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }


}
