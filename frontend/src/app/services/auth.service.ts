import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {LoginData} from "../models/login-data";
import {Authorization} from "../models/authorization";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:8080/auth"
  private httpClient: HttpClient;
  constructor(private handler: HttpBackend, private router: Router) {
    this.httpClient = new HttpClient(handler);
  }

  loginFuncionario(loginData: LoginData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<Authorization>(this.baseUrl, loginData).subscribe({
        next: (auth: Authorization) => {
          localStorage.setItem("token", auth.token);
          localStorage.setItem("expiry", auth.expiry);
          this.router.navigateByUrl('/contas-funcionario').then();
        },
        error: (error) => {
          if (error.status === 500) {
            reject(new Error('Internal Server Error'));
          } else if (error.status === 400) {
            reject(new Error('Bad Request'));
          } else {
            reject(error);
          }
        }
      });
    });
  }

  loginCliente(loginData: LoginData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<Authorization>(this.baseUrl, loginData).subscribe({
        next: (auth: Authorization) => {
          localStorage.setItem("token", auth.token);
          localStorage.setItem("expiry", auth.expiry);
          this.router.navigateByUrl('/home').then();
        },
        error: (error) => {
          if (error.status === 500) {
            reject(new Error('Internal Server Error'));
          } else if (error.status === 400) {
            reject(new Error('Bad Request'));
          } else {
            reject(error);
          }
        }
      });
    });
  }

  getToken(): string {
    let expiry = new Date(localStorage.getItem("expiry")!);
    if(expiry.getTime() <= Date.now()){
      //this.router.navigate(["/login"]).then();
      throw Error("Login expired");
    }
    return localStorage.getItem("token")!
  }
}
