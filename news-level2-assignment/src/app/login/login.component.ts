import { Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouteService } from '../services/route.service';
import { AuthenticationService } from '../services/authentication.service';
import { login } from '../models/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl("",Validators.required);
  password = new FormControl("",Validators.required);
  loginData = new login();
  submitMessage:string="";

  // implement login functionality using Reactive form
  // inject the dependencies required for authentication and routing
  constructor(private _route :RouteService,private _authserve:AuthenticationService) { 
    
  }

  loginSubmit() {
    this.submitMessage=""
    // implement login validation and error handling code here
    this.loginData.userId=this.username.value;
    this.loginData.password=this.password.value;
    //console.log(this.loginData)
    this._authserve.authenticateUser(this.loginData).subscribe(res=>{
      this._authserve.setBearerToken(res["token"]);
      this._route.toDashboard();                         
    },error => {
      if (error.status === 401){
        this.submitMessage = 'Unauthorized';
      } else if (error.status === 404){
        this.submitMessage = 'Http failure response for Authentication 404 Not Found';
      } else{
        this.submitMessage = 'Some error occured. Please try again!!';
      }
    });
  }
  registerUser() {
    this.submitMessage=""
    // implement login validation and error handling code here
    this.loginData.userId=this.username.value;
    this.loginData.password=this.password.value;
    //console.log(this.loginData)
    this._authserve.regiserUser(this.loginData).subscribe(res=>{
      this.submitMessage="Register User Succesfully";                         
    },error => {
      if (error.status === 409){
        this.submitMessage = 'User Already Exist';
      } else if (error.status === 404){
        this.submitMessage = 'Http failure response for Authentication 404 Not Found';
      } else{
        this.submitMessage = 'Some error occured. Please try again!!';
      }
    });
  }

  getErrorMessage() {
    // this function should return error message  
  }


}
