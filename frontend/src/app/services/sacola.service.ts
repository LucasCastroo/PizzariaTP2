import { Injectable } from '@angular/core';
import {ProdutoPedido} from "../models/pedido";
import {Pizza} from "../models/pizza";
import {Produto} from "../models/produto";

@Injectable({
  providedIn: 'root'
})
export class SacolaService {

  constructor() {
    if(!localStorage.getItem("sacola")) localStorage.setItem("sacola", "[]")
  }

  getSacola(): ProdutoPedido[]{
    return JSON.parse(localStorage.getItem("sacola") || '""') as ProdutoPedido[]
  }

  addProduto(produto: Produto){
    this.addItem({
      produto: produto,
      quantidade: 1
    })
  }

  addItem(item: ProdutoPedido): ProdutoPedido[] {
    let sacola = this.getSacola();
    sacola.push(item);
    localStorage.setItem("sacola", JSON.stringify(sacola));
    return sacola;
  }

  removeItem(idx: number): ProdutoPedido[]{
    let sacola = this.getSacola()
    sacola.splice(idx, 1);
    localStorage.setItem("sacola", JSON.stringify(sacola));
    return sacola;
  }

  setQuantity(idx: number, qnt: number): ProdutoPedido[]{
    let sacola = this.getSacola();
    if(sacola[idx]) sacola[idx].quantidade = qnt;
    localStorage.setItem("sacola", JSON.stringify(sacola));
    return sacola;
  }
}
