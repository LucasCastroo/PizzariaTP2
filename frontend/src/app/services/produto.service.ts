import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bebida} from "../models/bebida";
import {Pizza} from "../models/pizza";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseUrl = "http://localhost:8080/produto";
  constructor(private httpClient: HttpClient) {

  }
  create(produto: Bebida | Pizza) {
    return this.httpClient.post<Pizza | Bebida>(`${this.baseUrl}/create`, produto);
  }

  update(produto: Bebida | Pizza) {
    return this.httpClient.put<Pizza | Bebida>(`${this.baseUrl}/update/${produto.id}`, produto);
  }

  delete(id: number){
    this.httpClient.delete(`${this.baseUrl}/delete/${id}`)
  }
}