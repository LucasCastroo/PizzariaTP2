import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginData} from "../models/login-data";
import {Authorization} from "../models/authorization";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = "http://localhost:8080/auth"
  constructor(private httpClient: HttpClient) {}

  loginCliente(loginData: LoginData){
    this.httpClient.post(this.baseUrl + "/cliente", loginData).subscribe({
      next:(auth: Authorization)=>{
        if(auth && auth.token){
          localStorage.setItem("Authorization", auth.token);
          console.log(auth.token);
        }
      }
    });
  }
}
