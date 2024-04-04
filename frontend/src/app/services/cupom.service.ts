import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cupom} from "../models/cupom";
import {Observable} from "rxjs";
import {Cliente} from "../models/cliente";

@Injectable({
  providedIn: 'root'
})
export class CupomService {
  private baseUrl: string = "http://localhost:8080/cupom"

  constructor(private httpClient: HttpClient) { }

  findAll(){
    return this.httpClient.get<Cupom[]>(this.baseUrl);
  }

  findById(id: string): Observable<Cupom> {
    return this.httpClient.get<Cupom>(`${this.baseUrl}/${id}`);
  }

  create(cupom: Cupom){
    return this.httpClient.post<Cupom>(this.baseUrl, cupom);

  }

  update(id: string, cupom: Cupom){
    return this.httpClient.put<Cupom>(`${this.baseUrl}/${id}`, cupom);
  }

  delete(id: string){
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
