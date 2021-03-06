import { Injectable } from '@angular/core';

import { Router, CanActivate } from "@angular/router";
import { Subject } from "rxjs";
//import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { AuthData } from "../auth-data.model";




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;

  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router,
  //  private jwtHelperService: JwtHelperService
   ) {}

  httpHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  postHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    responseType: 'text' as 'json'
  };
  
  getToken() {
    return this.token;
  }

  getIsAuth() {
   
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string,email:string}>("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        
        this.token = token;
        this.router.navigate(["/login"]);

      });
  }


 

  
  

  login1( email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http
      .post<{ token: string; expiresIn: number;}>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(response => {
      
        const token = response.token;
       
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
        
       this.saveAuthData(token,expirationDate);
          this.router.navigate(["/viewnotes"]);
        }
      });
      
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  

  private saveAuthData(token: string, expirationDate: Date)
    {
      localStorage.setItem("token", token);
      localStorage.setItem("expiration", expirationDate.toISOString());
 
    }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  
     localStorage.removeItem("email")  
  }

  private getAuthData() {
    const token = localStorage.getItem("token")
   const email = localStorage.getItem("email")
    const expirationDate = localStorage.getItem("expiration");

    if (!token || !expirationDate 
   
      )
       {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
