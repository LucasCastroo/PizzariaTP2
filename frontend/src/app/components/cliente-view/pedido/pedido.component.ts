import {Component, OnInit} from '@angular/core';
import {PedidoService} from "../../../services/pedido.service";
import {ActivatedRoute} from "@angular/router";
import {formatFormaPagamento, formatStatus, Pedido, ProdutoPedido} from "../../../models/pedido";
import {Title} from "@angular/platform-browser";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {formatDate, NgIf} from "@angular/common";
import {isPizza} from "../../../models/produto";
import {formatTamanhoPizza} from "../../../models/pizza";
import {formatarMl} from "../../../utils/utils";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  displayedColumns = ["nome", "quantidade", "precoUnit", "precoTotal"]

  pedido: Pedido | undefined;
  items: ProdutoPedido[] = []
  constructor(private service: PedidoService, private route: ActivatedRoute, titleService: Title) {
    let id = route.snapshot.paramMap.get("id")
    if(id){
      titleService.setTitle(id);
      service.get(Number.parseInt(id)).subscribe(pedido =>{
        this.pedido = pedido;
        console.log(formatDate(pedido.historicoStatus[0].data!, "short", "pt-BR"))
        this.items = pedido.items as ProdutoPedido[]
      });
    }
  }

  protected readonly isPizza = isPizza;
  protected readonly formatTamanhoPizza = formatTamanhoPizza;
  protected readonly formatarMl = formatarMl;
  protected readonly parseFloat = parseFloat;
  protected readonly formatFormaPagamento = formatFormaPagamento;
  protected readonly Date = Date;
  protected readonly formatDate = formatDate;
  protected readonly formatStatus = formatStatus;
}
