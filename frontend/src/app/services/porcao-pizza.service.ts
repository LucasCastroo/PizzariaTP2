import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PorcaoPizza} from "../models/porcao-pizza";

@Injectable({
  providedIn: 'root'
})
export class PorcaoPizzaService {
  baseUrl = "http://localhost:8080/pizza/porcao"
  constructor(private httpClient: HttpClient) { }

  findById(id: string){
    return this.httpClient.get<PorcaoPizza>(`${this.baseUrl}/${id}`);
  }

  addIngrediente(id: string, ingredienteId: string){
    return this.httpClient.patch<PorcaoPizza>(`${this.baseUrl}/${id}/add/${ingredienteId}`, null);
  }

  removeIngrediente(id: string, ingredienteId: string){
    return this.httpClient.patch<PorcaoPizza>(`${this.baseUrl}/${id}/remove/${ingredienteId}`, null);
  }

  delete(id: string){
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  create(porcao: PorcaoPizza){
    return this.httpClient.post<PorcaoPizza>(`${this.baseUrl}/create`, porcao);
  }
}
