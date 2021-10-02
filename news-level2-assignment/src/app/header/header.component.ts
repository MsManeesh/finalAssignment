import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private _auth:AuthenticationService) { }
  @Input() title;
  ngOnInit() {
  }
  logoutUser(){
    this._auth.removeBearerToken();
  }

}
