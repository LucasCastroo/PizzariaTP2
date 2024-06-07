import { Component } from '@angular/core';
import {Pedido, ProdutoPedido, ProdutoPedidoCreate} from "../../../models/pedido";
import {PedidoService} from "../../../services/pedido.service";
import {isPizza, Produto} from "../../../models/produto";
import {formatTamanhoPizza} from "../../../models/pizza";
import {formatarMl} from "../../../utils/utils";
import {Bebida} from "../../../models/bebida";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './pedidos-cliente.component.html',
  styleUrl: './pedidos-cliente.component.css'
})
export class PedidosClienteComponent {
  pedidos: Pedido[] = []
  constructor(private service: PedidoService, protected router: Router) {
    service.listAll().subscribe(pedidos =>{
      this.pedidos = pedidos;
    })
  }
  getItems(items: ProdutoPedido[] | ProdutoPedidoCreate[]){
    return items as ProdutoPedido[];
  }

  getBebida(produto: Produto){
    return produto as Bebida
  }

  verPedido(id: number){
    this.router.navigateByUrl(`/pedido/${id}`)
  }

  protected readonly isPizza = isPizza;
  protected readonly formatTamanhoPizza = formatTamanhoPizza;
  protected readonly formatarMl = formatarMl;
}
