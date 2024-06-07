import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {NgForOf, NgIf} from "@angular/common";
import {Pedido} from "../../../models/pedido";
import {MatButtonToggle} from "@angular/material/button-toggle";

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButtonToggle,
    NgIf
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit{
  pedidos: Pedido[] = [];

  constructor() {
  }

  ngOnInit(): void {
    // this.pedidoService.find
  }


  // showSnackbarTopPosition(content: any, action: any) {
  //   this.snackBar.open(content, action, {
  //     duration: 2000,
  //     verticalPosition: 'top',
  //     horizontalPosition: 'center'
  //   });
  // }
}
