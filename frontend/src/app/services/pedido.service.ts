import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pedido, Status, StatusPedido} from "../models/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = "http://localhost:8080/pedido";
  constructor(private httpClient: HttpClient) {

  }

  create(pedido: Pedido){
    return this.httpClient.post<Pedido>(this.baseUrl, pedido);
  }

  listAll(){
    return this.httpClient.get<Pedido[]>(this.baseUrl);
  }

  get(id: number){
    return this.httpClient.get<Pedido>(`${this.baseUrl}/${id}`);
  }
  getAtivos(){
    return this.httpClient.get<Pedido[]>(`${this.baseUrl}/ativos`);
  }

  pagar(id: number){
    return this.httpClient.patch(`${this.baseUrl}/${id}/pagar`, null);
  }

  updateStatus(id: number, status: Status){
    return this.httpClient.patch<Pedido>(`${this.baseUrl}/${id}/status`, {status: status})
  }

}
