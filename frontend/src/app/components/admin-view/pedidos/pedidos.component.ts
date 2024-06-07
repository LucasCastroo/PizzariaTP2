import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {NgForOf} from "@angular/common";
import {Pedido, ProdutoPedido, ProdutoPedidoCreate, Status} from "../../../models/pedido";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PedidoService} from "../../../services/pedido.service";
import {isPizza, Produto} from "../../../models/produto";
import {formatTamanhoPizza} from "../../../models/pizza";
import {formatarMl} from "../../../utils/utils";
import {Bebida} from "../../../models/bebida";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButtonToggle,
    MatButton
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent{
  pedidos: Pedido[] = [];

  constructor(protected pedidoService: PedidoService) {
    pedidoService.getAtivos().subscribe(pedidos =>{
      this.pedidos = pedidos;
    })
  }

  setStatus(id: number, status: Status){
    this.pedidoService.updateStatus(id, status).subscribe(pedido =>{
      this.pedidos.splice(this.pedidos.findIndex(p => p.id == pedido.id), 1);
    });
  }

  getItems(items: ProdutoPedido[] | ProdutoPedidoCreate[]){
    return items as ProdutoPedido[];
  }

  getBebida(produto: Produto){
    return produto as Bebida
  }

  protected readonly isPizza = isPizza;
  protected readonly formatTamanhoPizza = formatTamanhoPizza;
  protected readonly formatarMl = formatarMl;
  protected readonly Status = Status;
}
