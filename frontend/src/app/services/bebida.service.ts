import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bebida} from "../models/bebida";

@Injectable({
  providedIn: 'root'
})
export class BebidaService {
  private baseUrl = "http://localhost:8080/produto";
  constructor(private httpClient: HttpClient) {

  }

  findAll(page?: number, pageSize?: number): Observable<Bebida[]> {
    let params = {
      tipo: "BEBIDA",
      page: "0",
      pageSize: "20"
    };
    if (page !== undefined && pageSize !== undefined) {
      params.page = page.toString();
      params.pageSize = pageSize.toString();
    }
    return this.httpClient.get<Bebida[]>(this.baseUrl, {params});
  }

  delete(id: number){
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`)
  }

  countBebidas(){
    return this.httpClient.get<number>(`${this.baseUrl}/count/bebida`)
  }

  uploadImage(image: File, id: number){
    const data = new FormData();
    data.append("imagem", image)
    data.append("nomeImagem", image.name)
    return this.httpClient.patch<Bebida>(`${this.baseUrl}/image/${id}`, data)
  }
}
