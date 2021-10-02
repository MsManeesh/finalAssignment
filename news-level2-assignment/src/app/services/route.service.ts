import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class RouteService {

  constructor(private _router : Router) { }

  toLogin(){
    // this method should allow navigation to login component
    this._router.navigate(["login"]);
  }

  toDashboard(){
    // this method should allow navigation to dashboard component
    this._router.navigate(["dashboard"]);
  }
  toBookmarks(){
    // this method should allow navigation to dashboard component
    this._router.navigate(["news-reader"]);
  }

}
