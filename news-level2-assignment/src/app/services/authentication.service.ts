import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthenticationService {

  authenticationUrl = "http://localhost:55392/api/Auth/"

  // inject the dependency required for making http calls
  constructor(private http:HttpClient) { }

  authenticateUser(user:any){    
    //this function should make a post request to auth api with user credentials (username and password)
    // the response should be returned to the calling method
    //console.log(this.authenticationUrl+"login");
    return this.http.post(this.authenticationUrl+"login",user);
  }
  regiserUser(user:any){
    return this.http.post(this.authenticationUrl+"register",user);
  }

  setBearerToken(token:any){
    // this method should store the authentication token to local storage
    localStorage.setItem("bearerToken",token);
  }
  
  getBearerToken(){
    // this method should return the authentication token stored in local storage
    return localStorage.getItem("bearerToken")
  }

  removeBearerToken(){
    // this method should clear the token stored in local storage
    localStorage.removeItem("bearerToken")
  }

  isUserAuthenticated(token:string):Promise<any>{
    // this method should validate authenticity of a user - accepts the token string 
    // and returns Promise of authenticated status of user with boolean value
     
      return this.http.post(this.authenticationUrl + 'isAuthenticated', {}, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
  }
  


  

}
