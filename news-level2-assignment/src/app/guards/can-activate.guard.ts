import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { RouteService } from '../services/route.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(private _authserve:AuthenticationService,private _route :RouteService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // the code here should allow user to navigate to dashboard if he is authenticated
      // else the code should redirect to login view
      this._authserve.isUserAuthenticated(this._authserve.getBearerToken())
      .then((data) => {
        //console.log(data);
        if(data){
          return true;
        } else{
          this._route.toLogin();
          return false;
        }
      })
      return true;
  }
  
}
