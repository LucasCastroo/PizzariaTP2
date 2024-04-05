import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ingrediente} from "../models/ingrediente";

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  baseUrl = "http://localhost:8080/ingrediente"
  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number){
    let params = {}
    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Ingrediente[]>(this.baseUrl, {params})
  }

  findById(id: string){
    return this.httpClient.get<Ingrediente>(`${this.baseUrl}/${id}`)
  }

  count(){
    return this.httpClient.get<number>(`${this.baseUrl}/count`)
  }

  search(nome: string){
    let params = {q: nome}
    return this.httpClient.get<Ingrediente[]>(`${this.baseUrl}/search`, {params})
  }

  create(ingrediente: Ingrediente){
    return this.httpClient.post<Ingrediente>(`${this.baseUrl}`, ingrediente);
  }

  update(ingrediente: Ingrediente){
    return this.httpClient.put<Ingrediente>(`${this.baseUrl}/update/${ingrediente.id}`, ingrediente);
  }

  delete(id: number){
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
