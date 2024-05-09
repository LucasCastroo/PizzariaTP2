import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  uploadImagem(id: number, imagem: File) {
    const formData: FormData = new FormData();
    formData.append('imagem', imagem, imagem.name);

    return this.httpClient.patch(`${this.baseUrl}/set-image/${id}`, formData);
  }
}
