import { Injectable } from '@angular/core';
import {ProdutoPedido} from "../models/pedido";
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

  getQuant(): number{
    let sacola = this.getSacola();
    let num = 0;
    sacola.forEach(item => {
      num += item.quantidade;
    });
    return num;
  }

  addProduto(produto: Produto){
    let sacola = this.getSacola();
    let prod = sacola.find(item => item.produto.id === produto.id);
    if(prod){
      prod.quantidade += 1;
      localStorage.setItem("sacola", JSON.stringify(sacola));
    } else {

      this.addItem({
        produto: produto,
        quantidade: 1
      })
    }
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

  limparSacola(){
    localStorage.setItem("sacola", "[]")
  }
}
