import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {LoginData} from "../models/login-data";
import {Authorization} from "../models/authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:8080/auth"
  private httpClient: HttpClient;
  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  login(loginData: LoginData, cliente: boolean = true){
    this.httpClient.post(this.baseUrl + (cliente ? "/cliente" : "/funcionario"), loginData).subscribe({
      next:(auth: Authorization)=>{
        if(auth && auth.token){
          localStorage.setItem("Authorization", auth.token);
          console.log(auth.token);
        }
      }
    });
  }

  getToken(): string {
    return localStorage.getItem("Authorization")!
  }

}
